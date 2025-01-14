import { useState, useEffect } from 'react';

    interface DashboardData {
      dailyRevenue: number;
      monthlyRevenue: number;
      dailyGoal: number;
      monthlyGoal: number;
      appointmentsToday: number;
      clientsToday: number;
      commissionTotal: number;
    }

    export function useDashboardData() {
      const [data, setData] = useState<DashboardData>({
        dailyRevenue: 1500,
        monthlyRevenue: 10000,
        dailyGoal: 2000,
        monthlyGoal: 40000,
        appointmentsToday: 8,
        clientsToday: 12,
        commissionTotal: 500
      });
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setData({
            dailyRevenue: 1500,
            monthlyRevenue: 10000,
            dailyGoal: 2000,
            monthlyGoal: 40000,
            appointmentsToday: 8,
            clientsToday: 12,
            commissionTotal: 500
          });
          setLoading(false);
        }, 500);
      }, []);

      return { data, loading, error };
    }
