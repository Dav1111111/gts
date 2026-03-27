// Deno runtime declarations for Supabase Edge Functions
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
  serve(handler: (req: Request) => Response | Promise<Response>): void;
};

// @ts-ignore: npm: specifier resolved by Deno runtime
import { Hono } from "npm:hono";
// @ts-ignore: npm: specifier resolved by Deno runtime
import { cors } from "npm:hono/cors";
// @ts-ignore: npm: specifier resolved by Deno runtime
import { logger } from "npm:hono/logger";
// @ts-ignore: jsr: specifier resolved by Deno runtime
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
import * as bookingSystem from "./booking_system.tsx";

// Minimal Hono type declarations
interface HonoContext {
  req: {
    header(name: string): string | undefined;
    query(name?: string): Record<string, string>;
    param(name: string): string;
    json(): Promise<Record<string, unknown>>;
  };
  json(data: unknown, status?: number): Response;
  set(key: string, value: unknown): void;
  get(key: string): unknown;
}

type HonoNext = () => Promise<void>;

interface HonoApp {
  use(path: string, ...handlers: unknown[]): void;
  get(path: string, ...handlers: unknown[]): void;
  post(path: string, ...handlers: unknown[]): void;
  put(path: string, ...handlers: unknown[]): void;
  delete(path: string, ...handlers: unknown[]): void;
  fetch: (req: Request) => Response | Promise<Response>;
}

interface SupabaseUser {
  id: string;
  user_metadata?: Record<string, string>;
}

const app: HonoApp = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Enable logger
app.use('*', logger());

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Auth middleware
async function authMiddleware(c: HonoContext, next: HonoNext): Promise<Response | void> {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const accessToken = authHeader.split(' ')[1];
  if (!accessToken) {
    return c.json({ error: 'Invalid token format' }, 401);
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Invalid or expired token' }, 401);
    }

    c.set('user', user);
    await next();
  } catch (err: unknown) {
    console.error('Auth middleware error:', err);
    return c.json({ error: 'Authentication failed' }, 401);
  }
}

// Health check endpoint
app.get("/make-server-ecbf162f/health", (c: HonoContext) => {
  return c.json({ status: "ok" });
});

// Booking Management API Routes
app.get("/make-server-ecbf162f/bookings", authMiddleware, async (c: HonoContext) => {
  try {
    const user = c.get('user') as SupabaseUser;
    const query = c.req.query();

    const filters: bookingSystem.BookingFilters = {};
    if (query.resource_id) filters.resource_id = query.resource_id;
    if (query.crew_id) filters.crew_id = query.crew_id;
    if (query.date_from) filters.date_from = query.date_from;
    if (query.date_to) filters.date_to = query.date_to;
    if (query.status) filters.status = query.status;

    const bookings = await bookingSystem.getBookings(filters);

    // Filter bookings based on user role
    const userRole = user.user_metadata?.role || 'guest';
    let filteredBookings = bookings;

    if (userRole === 'captain') {
      filteredBookings = bookings.filter((b) =>
        b.resource.type === 'boat' ||
        b.crew.some((member) => member.id === user.id)
      );
    } else if (userRole === 'pilot') {
      filteredBookings = bookings.filter((b) =>
        b.resource.type === 'helicopter' ||
        b.crew.some((member) => member.id === user.id)
      );
    } else if (userRole === 'guide') {
      filteredBookings = bookings.filter((b) =>
        b.crew.some((member) => member.id === user.id)
      );
    } else if (userRole === 'partner') {
      filteredBookings = bookings.filter((b) =>
        b.partner?.id === user.id
      );
    }

    return c.json({
      success: true,
      bookings: filteredBookings,
      total: filteredBookings.length
    });
  } catch (err: unknown) {
    console.error('Error fetching bookings:', err);
    return c.json({ success: false, error: 'Failed to fetch bookings' }, 500);
  }
});

app.post("/make-server-ecbf162f/bookings", authMiddleware, async (c: HonoContext) => {
  try {
    const user = c.get('user') as SupabaseUser;
    const bookingData = await c.req.json();

    // Add user context
    bookingData.created_by = user.id;
    bookingData.updated_by = user.id;

    const result = await bookingSystem.createBooking(bookingData);

    if (result.success) {
      return c.json(result, 201);
    } else {
      return c.json(result, 400);
    }
  } catch (err: unknown) {
    console.error('Error creating booking:', err);
    return c.json({ success: false, error: 'Failed to create booking' }, 500);
  }
});

app.put("/make-server-ecbf162f/bookings/:id", authMiddleware, async (c: HonoContext) => {
  try {
    const user = c.get('user') as SupabaseUser;
    const bookingId = c.req.param('id');
    const updates = await c.req.json();

    const result = await bookingSystem.updateBooking(bookingId, updates, user.id);

    if (result.success) {
      return c.json(result);
    } else {
      return c.json(result, 400);
    }
  } catch (err: unknown) {
    console.error('Error updating booking:', err);
    return c.json({ success: false, error: 'Failed to update booking' }, 500);
  }
});

app.delete("/make-server-ecbf162f/bookings/:id", authMiddleware, async (c: HonoContext) => {
  try {
    const user = c.get('user') as SupabaseUser;
    const bookingId = c.req.param('id');

    const result = await bookingSystem.deleteBooking(bookingId, user.id);

    if (result.success) {
      return c.json(result);
    } else {
      return c.json(result, 400);
    }
  } catch (err: unknown) {
    console.error('Error deleting booking:', err);
    return c.json({ success: false, error: 'Failed to delete booking' }, 500);
  }
});

// Notifications API
app.get("/make-server-ecbf162f/notifications", authMiddleware, async (c: HonoContext) => {
  try {
    const user = c.get('user') as SupabaseUser;
    const limit = parseInt(c.req.query()['limit'] || '20', 10);

    const notifications = await bookingSystem.getUserNotifications(user.id, limit);

    return c.json({
      success: true,
      notifications,
      unread_count: notifications.filter((n) => !n.read).length
    });
  } catch (err: unknown) {
    console.error('Error fetching notifications:', err);
    return c.json({ success: false, error: 'Failed to fetch notifications' }, 500);
  }
});

app.post("/make-server-ecbf162f/notifications/:id/read", authMiddleware, async (c: HonoContext) => {
  try {
    const user = c.get('user') as SupabaseUser;
    const notificationId = c.req.param('id');

    const result = await bookingSystem.markNotificationAsRead(user.id, notificationId);

    return c.json(result);
  } catch (err: unknown) {
    console.error('Error marking notification as read:', err);
    return c.json({ success: false, error: 'Failed to mark notification as read' }, 500);
  }
});

// Resource management routes
app.get("/make-server-ecbf162f/resources", authMiddleware, async (c: HonoContext) => {
  try {
    const resourceEntries = await kv.getByPrefix('resource:');
    const resources = resourceEntries.map((item) => item.value);

    return c.json({
      success: true,
      resources
    });
  } catch (err: unknown) {
    console.error('Error fetching resources:', err);
    return c.json({ success: false, error: 'Failed to fetch resources' }, 500);
  }
});

app.get("/make-server-ecbf162f/crew", authMiddleware, async (c: HonoContext) => {
  try {
    const crewEntries = await kv.getByPrefix('crew:');
    const crewMembers = crewEntries.map((item) => item.value);

    return c.json({
      success: true,
      crew: crewMembers
    });
  } catch (err: unknown) {
    console.error('Error fetching crew:', err);
    return c.json({ success: false, error: 'Failed to fetch crew' }, 500);
  }
});

// Real-time endpoint for calendar updates
app.get("/make-server-ecbf162f/calendar/updates", authMiddleware, async (c: HonoContext) => {
  try {
    const user = c.get('user') as SupabaseUser;
    const sinceParam: string = c.req.query()['since'] || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    // Get recent bookings
    const allBookings = await bookingSystem.getBookings();
    const recentBookings = allBookings.filter((b) =>
      new Date(b.updated_at) > new Date(sinceParam)
    );

    // Get user notifications
    const notifications = await bookingSystem.getUserNotifications(user.id, 10);
    const unreadNotifications = notifications.filter((n) =>
      new Date(n.created_at) > new Date(sinceParam)
    );

    return c.json({
      success: true,
      updates: {
        bookings: recentBookings,
        notifications: unreadNotifications,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err: unknown) {
    console.error('Error fetching calendar updates:', err);
    return c.json({ success: false, error: 'Failed to fetch updates' }, 500);
  }
});

// Analytics endpoint
app.get("/make-server-ecbf162f/analytics/utilization", authMiddleware, async (c: HonoContext) => {
  try {
    const date = c.req.query()['date'] || new Date().toISOString().split('T')[0];
    const utilization = await kv.get(`utilization:${date}`);

    return c.json({
      success: true,
      utilization: utilization || { date, resource_utilization: {}, crew_utilization: {} }
    });
  } catch (err: unknown) {
    console.error('Error fetching utilization analytics:', err);
    return c.json({ success: false, error: 'Failed to fetch analytics' }, 500);
  }
});

// Push notification subscription endpoint
app.post("/make-server-ecbf162f/notifications/subscribe", authMiddleware, async (c: HonoContext) => {
  try {
    const user = c.get('user') as SupabaseUser;
    const body = await c.req.json();
    const endpoint = body.endpoint as string;
    const keys = body.keys as Record<string, string>;

    // Store push subscription
    await kv.set(`push_subscription:${user.id}`, {
      user_id: user.id,
      endpoint,
      keys,
      created_at: new Date().toISOString()
    });

    return c.json({
      success: true,
      message: 'Push notifications enabled'
    });
  } catch (err: unknown) {
    console.error('Error subscribing to push notifications:', err);
    return c.json({ success: false, error: 'Failed to subscribe to notifications' }, 500);
  }
});

Deno.serve(app.fetch);
