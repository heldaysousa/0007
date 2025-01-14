import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../store/authStore';
import { CommissionDashboardData } from '../types';

export function useCommissionDashboard() {
  const [data, setData] = useState<CommissionDashboardData>({
    totalCommissions: 0,
    pendingCommissions: 0,
    averageRate: 0,
    topProfessionals: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      
      try {
        const { data: commissions, error: fetchError } = await supabase
          .from('commissions')
          .select(`
            amount,
            rate,
            status,
            professional:professionals(name)
          `)
          .eq('owner_id', user.id);

        if (fetchError) throw fetchError;

        const total = commissions?.reduce((sum, c) => sum + c.amount, 0) || 0;
        const pending = commissions
          ?.filter(c => c.status === 'pending')
          .reduce((sum, c) => sum + c.amount, 0) || 0;
        const avgRate = commissions?.reduce((sum, c) => sum + c.rate, 0) / (commissions?.length || 1);

        setData({
          totalCommissions: total,
          pendingCommissions: pending,
          averageRate: avgRate,
          topProfessionals: []
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user]);

  return { data, loading, error };
}
