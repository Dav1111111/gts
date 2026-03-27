// Booking system module for Supabase Edge Functions
// Provides CRUD operations for bookings, notifications, and related entities.

import * as kv from "./kv_store.tsx";

// --- Type Definitions ---

export interface CrewMember {
  id: string;
  name: string;
  role: string;
}

export interface Resource {
  id: string;
  name: string;
  type: string;
}

export interface Partner {
  id: string;
  name: string;
}

export interface Booking {
  id: string;
  resource_id: string;
  resource: Resource;
  crew: CrewMember[];
  partner?: Partner;
  status: string;
  date_from: string;
  date_to: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}

export interface Notification {
  id: string;
  user_id: string;
  message: string;
  read: boolean;
  created_at: string;
  [key: string]: unknown;
}

export interface BookingFilters {
  resource_id?: string;
  crew_id?: string;
  date_from?: string;
  date_to?: string;
  status?: string;
}

export interface BookingResult {
  success: boolean;
  booking?: Booking;
  error?: string;
}

// --- Booking Operations ---

export async function getBookings(filters?: BookingFilters): Promise<Booking[]> {
  const entries = await kv.getByPrefix("booking:");
  let bookings = entries.map((entry) => entry.value) as Booking[];

  if (filters) {
    if (filters.resource_id) {
      bookings = bookings.filter((b) => b.resource_id === filters.resource_id);
    }
    if (filters.crew_id) {
      bookings = bookings.filter((b) =>
        b.crew.some((member) => member.id === filters.crew_id)
      );
    }
    if (filters.date_from) {
      bookings = bookings.filter((b) => b.date_from >= filters.date_from!);
    }
    if (filters.date_to) {
      bookings = bookings.filter((b) => b.date_to <= filters.date_to!);
    }
    if (filters.status) {
      bookings = bookings.filter((b) => b.status === filters.status);
    }
  }

  return bookings;
}

export async function createBooking(
  bookingData: Record<string, unknown>
): Promise<BookingResult> {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const booking: Booking = {
    id,
    resource_id: bookingData.resource_id as string,
    resource: bookingData.resource as Resource,
    crew: (bookingData.crew as CrewMember[]) || [],
    partner: bookingData.partner as Partner | undefined,
    status: (bookingData.status as string) || "pending",
    date_from: bookingData.date_from as string,
    date_to: bookingData.date_to as string,
    created_by: bookingData.created_by as string,
    updated_by: bookingData.updated_by as string,
    created_at: now,
    updated_at: now,
  };

  await kv.set(`booking:${id}`, booking);

  return { success: true, booking };
}

export async function updateBooking(
  bookingId: string,
  updates: Record<string, unknown>,
  userId: string
): Promise<BookingResult> {
  const existing = (await kv.get(`booking:${bookingId}`)) as Booking | undefined;
  if (!existing) {
    return { success: false, error: "Booking not found" };
  }

  const updated: Booking = {
    ...existing,
    ...updates,
    id: bookingId,
    updated_by: userId,
    updated_at: new Date().toISOString(),
  } as Booking;

  await kv.set(`booking:${bookingId}`, updated);

  return { success: true, booking: updated };
}

export async function deleteBooking(
  bookingId: string,
  _userId: string
): Promise<BookingResult> {
  const existing = (await kv.get(`booking:${bookingId}`)) as Booking | undefined;
  if (!existing) {
    return { success: false, error: "Booking not found" };
  }

  await kv.del(`booking:${bookingId}`);

  return { success: true };
}

// --- Notification Operations ---

export async function getUserNotifications(
  userId: string,
  limit: number
): Promise<Notification[]> {
  const entries = await kv.getByPrefix(`notification:${userId}:`);
  const notifications = entries.map((entry) => entry.value) as Notification[];

  // Sort by created_at descending
  notifications.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return notifications.slice(0, limit);
}

export async function markNotificationAsRead(
  userId: string,
  notificationId: string
): Promise<{ success: boolean }> {
  const key = `notification:${userId}:${notificationId}`;
  const existing = (await kv.get(key)) as Notification | undefined;
  if (!existing) {
    return { success: false };
  }

  existing.read = true;
  await kv.set(key, existing);

  return { success: true };
}
