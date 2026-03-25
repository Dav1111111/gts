// 🎭 Simplified hook for working with mock data in prototype
import { useState, useEffect, useCallback } from 'react';
import { mockDataStore, MockAPI } from '../utils/mockData';

export function useMockData(table: string, autoLoad = true) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(autoLoad);
  const [error, setError] = useState<string | null>(null);

  // Load data
  const loadData = useCallback(async (query?: any) => {
    try {
      setLoading(true);
      setError(null);
      
      await MockAPI.delay(100); // Minimal delay for realism
      const result = mockDataStore.select(table, query);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [table]);

  // Create item
  const create = useCallback(async (item: any) => {
    try {
      setLoading(true);
      await MockAPI.delay(200);
      
      const newItem = mockDataStore.insert(table, item);
      setData(prev => [...prev, newItem]);
      
      return { success: true, data: newItem };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error';
      setError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [table]);

  // Update item
  const update = useCallback(async (id: string, updates: any) => {
    try {
      setLoading(true);
      await MockAPI.delay(150);
      
      const updatedItem = mockDataStore.update(table, id, updates);
      if (updatedItem) {
        setData(prev => prev.map(item => 
          item.id === id ? updatedItem : item
        ));
        return { success: true, data: updatedItem };
      }
      
      throw new Error('Item not found');
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error';
      setError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [table]);

  // Delete item
  const remove = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await MockAPI.delay(100);
      
      const success = mockDataStore.delete(table, id);
      if (success) {
        setData(prev => prev.filter(item => (item as any).id !== id));
        return { success: true };
      }
      
      throw new Error('Item not found');
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error';
      setError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [table]);

  // Auto-load on mount
  useEffect(() => {
    if (autoLoad) {
      loadData();
    }
  }, [loadData, autoLoad]);

  return {
    data,
    loading,
    error,
    loadData,
    create,
    update,
    remove,
    refresh: () => loadData()
  };
}

// Specialized hooks for common data types
export const useClients = () => useMockData('clients');
export const useDeals = () => useMockData('deals');
export const useActivities = () => useMockData('activities');
export const useBookings = () => useMockData('bookings');
export const useFleet = () => useMockData('fleet');
export const usePartners = () => useMockData('partners');
export const useRevenue = () => useMockData('revenue');
export const useWeather = () => useMockData('weather');

// Hook for real-time style updates (simulated)
export function useRealtimeData(table: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial load
    const loadData = async () => {
      await MockAPI.delay(200);
      const result = mockDataStore.select(table);
      setData(result);
      setLoading(false);
    };

    loadData();

    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      const result = mockDataStore.select(table);
      setData(result);
    }, 30000);

    return () => clearInterval(interval);
  }, [table]);

  return { data, loading };
}

// Hook for analytics data with date ranges
export function useAnalytics(dateRange?: { start: string; end: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      await MockAPI.delay(300);
      
      let revenue = mockDataStore.select('revenue');
      
      // Filter by date range if provided
      if (dateRange) {
        revenue = revenue.filter(item => 
          item.date >= dateRange.start && item.date <= dateRange.end
        );
      }

      // Calculate aggregated metrics
      const totalRevenue = revenue.reduce((sum, item) => sum + item.total, 0);
      const avgDailyRevenue = totalRevenue / (revenue.length || 1);
      
      const metrics = {
        totalRevenue,
        avgDailyRevenue,
        totalBookings: mockDataStore.select('bookings').length,
        activeClients: mockDataStore.select('clients', { 
          where: { status: { in: ['active', 'vip'] } } 
        }).length,
        revenue
      };
      
      setData(metrics);
      setLoading(false);
    };

    loadAnalytics();
  }, [dateRange]);

  return { data, loading };
}