import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
import * as bookingSystem from "./booking_system.tsx";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Enable logger
app.use('*', logger(console.log));

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
async function authMiddleware(c: any, next: any) {
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
  } catch (error) {
    console.error('Auth middleware error:', error);
    return c.json({ error: 'Authentication failed' }, 401);
  }
}

// Health check endpoint
app.get("/make-server-ecbf162f/health", (c) => {
  return c.json({ status: "ok" });
});

// Booking Management API Routes
app.get("/make-server-ecbf162f/bookings", authMiddleware, async (c) => {
  try {
    const user = c.get('user');
    const query = c.req.query();
    
    const filters: any = {};
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
      filteredBookings = bookings.filter(b => 
        b.resource.type === 'boat' || 
        b.crew.some(c => c.id === user.id)
      );
    } else if (userRole === 'pilot') {
      filteredBookings = bookings.filter(b => 
        b.resource.type === 'helicopter' || 
        b.crew.some(c => c.id === user.id)
      );
    } else if (userRole === 'guide') {
      filteredBookings = bookings.filter(b => 
        b.crew.some(c => c.id === user.id)
      );
    } else if (userRole === 'partner') {
      filteredBookings = bookings.filter(b => 
        b.partner?.id === user.id
      );
    }
    
    return c.json({
      success: true,
      bookings: filteredBookings,
      total: filteredBookings.length
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return c.json({ success: false, error: 'Failed to fetch bookings' }, 500);
  }
});

app.post("/make-server-ecbf162f/bookings", authMiddleware, async (c) => {
  try {
    const user = c.get('user');
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
  } catch (error) {
    console.error('Error creating booking:', error);
    return c.json({ success: false, error: 'Failed to create booking' }, 500);
  }
});

app.put("/make-server-ecbf162f/bookings/:id", authMiddleware, async (c) => {
  try {
    const user = c.get('user');
    const bookingId = c.req.param('id');
    const updates = await c.req.json();
    
    const result = await bookingSystem.updateBooking(bookingId, updates, user.id);
    
    if (result.success) {
      return c.json(result);
    } else {
      return c.json(result, 400);
    }
  } catch (error) {
    console.error('Error updating booking:', error);
    return c.json({ success: false, error: 'Failed to update booking' }, 500);
  }
});

app.delete("/make-server-ecbf162f/bookings/:id", authMiddleware, async (c) => {
  try {
    const user = c.get('user');
    const bookingId = c.req.param('id');
    
    const result = await bookingSystem.deleteBooking(bookingId, user.id);
    
    if (result.success) {
      return c.json(result);
    } else {
      return c.json(result, 400);
    }
  } catch (error) {
    console.error('Error deleting booking:', error);
    return c.json({ success: false, error: 'Failed to delete booking' }, 500);
  }
});

// Notifications API
app.get("/make-server-ecbf162f/notifications", authMiddleware, async (c) => {
  try {
    const user = c.get('user');
    const limit = parseInt(c.req.query('limit') || '20');
    
    const notifications = await bookingSystem.getUserNotifications(user.id, limit);
    
    return c.json({
      success: true,
      notifications,
      unread_count: notifications.filter(n => !n.read).length
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return c.json({ success: false, error: 'Failed to fetch notifications' }, 500);
  }
});

app.post("/make-server-ecbf162f/notifications/:id/read", authMiddleware, async (c) => {
  try {
    const user = c.get('user');
    const notificationId = c.req.param('id');
    
    const result = await bookingSystem.markNotificationAsRead(user.id, notificationId);
    
    return c.json(result);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return c.json({ success: false, error: 'Failed to mark notification as read' }, 500);
  }
});

// Resource management routes
app.get("/make-server-ecbf162f/resources", authMiddleware, async (c) => {
  try {
    const resourceKeys = await kv.getByPrefix('resource:');
    const resources = resourceKeys.map(item => item.value);
    
    return c.json({
      success: true,
      resources
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return c.json({ success: false, error: 'Failed to fetch resources' }, 500);
  }
});

app.get("/make-server-ecbf162f/crew", authMiddleware, async (c) => {
  try {
    const crewKeys = await kv.getByPrefix('crew:');
    const crewMembers = crewKeys.map(item => item.value);
    
    return c.json({
      success: true,
      crew: crewMembers
    });
  } catch (error) {
    console.error('Error fetching crew:', error);
    return c.json({ success: false, error: 'Failed to fetch crew' }, 500);
  }
});

// Real-time endpoint for calendar updates
app.get("/make-server-ecbf162f/calendar/updates", authMiddleware, async (c) => {
  try {
    const user = c.get('user');
    const since = c.req.query('since') || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    
    // Get recent bookings
    const allBookings = await bookingSystem.getBookings();
    const recentBookings = allBookings.filter(b => 
      new Date(b.updated_at) > new Date(since)
    );
    
    // Get user notifications
    const notifications = await bookingSystem.getUserNotifications(user.id, 10);
    const unreadNotifications = notifications.filter(n => 
      new Date(n.created_at) > new Date(since)
    );
    
    return c.json({
      success: true,
      updates: {
        bookings: recentBookings,
        notifications: unreadNotifications,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching calendar updates:', error);
    return c.json({ success: false, error: 'Failed to fetch updates' }, 500);
  }
});

// Analytics endpoint
app.get("/make-server-ecbf162f/analytics/utilization", authMiddleware, async (c) => {
  try {
    const date = c.req.query('date') || new Date().toISOString().split('T')[0];
    const utilization = await kv.get(`utilization:${date}`);
    
    return c.json({
      success: true,
      utilization: utilization || { date, resource_utilization: {}, crew_utilization: {} }
    });
  } catch (error) {
    console.error('Error fetching utilization analytics:', error);
    return c.json({ success: false, error: 'Failed to fetch analytics' }, 500);
  }
});

// Push notification subscription endpoint
app.post("/make-server-ecbf162f/notifications/subscribe", authMiddleware, async (c) => {
  try {
    const user = c.get('user');
    const { endpoint, keys } = await c.req.json();
    
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
  } catch (error) {
    console.error('Error subscribing to push notifications:', error);
    return c.json({ success: false, error: 'Failed to subscribe to notifications' }, 500);
  }
});

Deno.serve(app.fetch);