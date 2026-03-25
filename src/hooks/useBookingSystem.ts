import { useState, useEffect, useCallback, useRef } from 'react';

// Types matching the backend
export interface Booking {
  id: string;
  title: string;
  client: {
    name: string;
    company?: string;
    phone: string;
    email: string;
  };
  resource: {
    id: string;
    name: string;
    type: 'boat' | 'helicopter' | 'buggy' | 'staff';
  };
  crew: Array<{
    id: string;
    name: string;
    role: string;
  }>;
  partner?: {
    id: string;
    name: string;
    commission: number;
  };
  datetime: {
    start: string;
    end: string;
    date: string;
  };
  guests: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  weather?: {
    temp: number;
    condition: 'sunny' | 'cloudy' | 'partly_cloudy' | 'rainy' | 'windy';
    wind: number;
    warnings?: string[];
  };
  documents?: {
    contract?: string;
    insurance?: string;
    permits?: string[];
  };
  notes?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

export interface BookingNotification {
  id: string;
  booking_id: string;
  action: 'created' | 'updated' | 'cancelled';
  message: string;
  recipients: string[];
  created_at: string;
  booking_snapshot: Booking;
  read?: boolean;
}

interface UseBookingSystemOptions {
  enableRealTime?: boolean;
  pollInterval?: number; // milliseconds
  autoRefresh?: boolean;
}

interface BookingFilters {
  resource_id?: string;
  crew_id?: string;
  date_from?: string;
  date_to?: string;
  status?: string;
}

export function useBookingSystem(options: UseBookingSystemOptions = {}) {
  const {
    enableRealTime = true,
    pollInterval = 30000, // 30 seconds
    autoRefresh = true
  } = options;

  // State
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notifications, setNotifications] = useState<BookingNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  // Refs
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastSyncRef = useRef<string | null>(null);

  // Mock bookings data for fallback
  const mockBookings: Booking[] = [
    {
      id: '1',
      title: 'VIP Морская прогулка',
      client: {
        name: 'Иванов Александр Михайлович',
        company: 'ООО "Альфа-Строй"',
        phone: '+7 (999) 123-45-67',
        email: 'ivanov@alfastroy.ru'
      },
      resource: {
        id: 'boat-001',
        name: 'Катер "Морской Волк"',
        type: 'boat'
      },
      crew: [
        { id: 'crew-001', name: 'Капитан Петров', role: 'Капитан' },
        { id: 'crew-002', name: 'Матрос Сидоров', role: 'Матрос' }
      ],
      partner: {
        id: 'partner-001',
        name: 'Сочи Тур Агент',
        commission: 15
      },
      datetime: {
        start: '10:00',
        end: '14:00',
        date: new Date().toISOString().split('T')[0]
      },
      guests: 8,
      status: 'confirmed',
      price: 120000,
      weather: {
        temp: 22,
        condition: 'sunny',
        wind: 8,
        warnings: []
      },
      documents: {
        contract: 'contract_001.pdf',
        insurance: 'insurance_001.pdf',
        permits: ['permit_sea_001.pdf']
      },
      notes: 'Корпоративное мероприятие, нужен фуршет на борту',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: 'demo-user',
      updated_by: 'demo-user'
    },
    {
      id: '2',
      title: 'Вертолётная экскурсия',
      client: {
        name: 'Смирнова Ольга Владимировна',
        phone: '+7 (999) 234-56-78',
        email: 'o.smirnova@email.com'
      },
      resource: {
        id: 'helicopter-001',
        name: 'Вертолёт Robinson R44',
        type: 'helicopter'
      },
      crew: [
        { id: 'crew-003', name: 'Пилот Козлов', role: 'Пилот' }
      ],
      datetime: {
        start: '09:00',
        end: '10:30',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      guests: 3,
      status: 'pending',
      price: 180000,
      weather: {
        temp: 18,
        condition: 'cloudy',
        wind: 15,
        warnings: ['Сильный ветер, возможна отмена']
      },
      documents: {
        contract: 'contract_002.pdf'
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: 'demo-user',
      updated_by: 'demo-user'
    }
  ];

  // Always in demo mode for this environment
  const isDemoMode = useCallback(() => {
    return true;
  }, []);

  // API Methods
  const fetchBookings = useCallback(async (filters?: BookingFilters) => {
    setLoading(true);
    setError(null);

    // Always use demo mode - skip API calls entirely
    console.log('Demo mode: Using mock bookings data');
    
    // Filter mock bookings based on provided filters
    let filteredMockBookings = [...mockBookings];
    
    if (filters?.resource_id) {
      filteredMockBookings = filteredMockBookings.filter(b => b.resource.id === filters.resource_id);
    }
    
    if (filters?.status) {
      filteredMockBookings = filteredMockBookings.filter(b => b.status === filters.status);
    }
    
    if (filters?.date_from) {
      filteredMockBookings = filteredMockBookings.filter(b => b.datetime.date >= filters.date_from!);
    }
    
    if (filters?.date_to) {
      filteredMockBookings = filteredMockBookings.filter(b => b.datetime.date <= filters.date_to!);
    }
    
    // Simulate API delay for realistic demo experience
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Use mock data directly in demo mode
    setBookings(filteredMockBookings);
    setLastUpdated(new Date().toISOString());
    setConnected(false); // Indicate we're in demo mode
    lastSyncRef.current = new Date().toISOString();
    setError(null); // No error in demo mode
    setLoading(false);
  }, []);

  const createBooking = useCallback(async (bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) => {
    // Always use demo mode
    console.log('Demo mode: Creating booking locally');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Create booking locally for demo
    const newBooking: Booking = {
      id: `demo-${Date.now()}`,
      ...bookingData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: 'demo-user',
      updated_by: 'demo-user'
    };
    
    setBookings(prev => [...prev, newBooking]);
    return { success: true, booking: newBooking };
  }, []);

  const updateBooking = useCallback(async (bookingId: string, updates: Partial<Booking>) => {
    // Always use demo mode
    console.log('Demo mode: Updating booking locally');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 150));
    
    // Update booking locally for demo
    setBookings(prev => prev.map(b => 
      b.id === bookingId 
        ? { ...b, ...updates, updated_at: new Date().toISOString(), updated_by: 'demo-user' }
        : b
    ));
    
    const updatedBooking = bookings.find(b => b.id === bookingId);
    if (updatedBooking) {
      const finalBooking = { ...updatedBooking, ...updates, updated_at: new Date().toISOString() };
      return { success: true, booking: finalBooking };
    }
    
    return { success: false, error: 'Booking not found' };
  }, [bookings]);

  const deleteBooking = useCallback(async (bookingId: string) => {
    // Always use demo mode
    console.log('Demo mode: Deleting booking locally');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 150));
    
    // Delete booking locally for demo
    setBookings(prev => prev.filter(b => b.id !== bookingId));
    return { success: true };
  }, []);

  const fetchNotifications = useCallback(async (limit = 20) => {
    // Always use demo mode
    console.log('Demo mode: Using mock notifications data');
    
    // Mock notifications for demo
    const mockNotifications: BookingNotification[] = [
      {
        id: 'notif-1',
        booking_id: '1',
        action: 'created',
        message: 'Создано новое бронирование "VIP Морская прогулка"',
        recipients: ['demo-user'],
        created_at: new Date().toISOString(),
        booking_snapshot: mockBookings[0],
        read: false
      },
      {
        id: 'notif-2',
        booking_id: '2', 
        action: 'updated',
        message: 'Обновлено бронирование "Вертолётная экскурсия"',
        recipients: ['demo-user'],
        created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        booking_snapshot: mockBookings[1],
        read: true
      }
    ];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 150));
    
    setNotifications(mockNotifications);
    return { success: true, notifications: mockNotifications, unread_count: 1 };
  }, []);

  const markNotificationAsRead = useCallback(async (notificationId: string) => {
    // Always use demo mode
    console.log('Demo mode: Marking notification as read locally');
    
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
    return { success: true };
  }, []);

  // Real-time sync (disabled in demo mode)
  const syncUpdates = useCallback(async () => {
    // Skip real-time sync in demo mode
    return;
  }, []);

  // Setup polling
  useEffect(() => {
    if (autoRefresh && enableRealTime) {
      pollIntervalRef.current = setInterval(syncUpdates, pollInterval);
      
      return () => {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
        }
      };
    }
  }, [autoRefresh, enableRealTime, pollInterval, syncUpdates]);

  // Manual refresh
  const refresh = useCallback(async (filters?: BookingFilters) => {
    await Promise.all([
      fetchBookings(filters),
      fetchNotifications()
    ]);
  }, [fetchBookings, fetchNotifications]);

  // Connection status is now handled by AuthContext
  // We'll use the session state from context instead of direct auth listener

  return {
    // Data
    bookings,
    notifications,
    loading,
    error,
    connected,
    lastUpdated,
    
    // Methods
    fetchBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    fetchNotifications,
    markNotificationAsRead,
    refresh,
    syncUpdates,
    
    // Stats
    unreadCount: notifications.filter(n => !n.read).length,
    totalBookings: bookings.length,
    todayBookings: bookings.filter(b => {
      const today = new Date().toISOString().split('T')[0];
      return b.datetime.date === today && b.status !== 'cancelled';
    }).length,
  };
}

export default useBookingSystem;
