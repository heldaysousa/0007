import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../store/authStore';
import { Settings } from '../types';
import { DEFAULT_SETTINGS } from '../utils/defaults';

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const loadSettings = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('business_settings')
        .select('*')
        .eq('owner_id', user.id)
        .single();

      if (fetchError) throw fetchError;
      setSettings(data || DEFAULT_SETTINGS);
    } catch (err) {
      setError((err as Error).message);
      console.error('Error loading settings:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateSettings = useCallback(async (updates: Partial<Settings>) => {
    if (!user) return;

    setLoading(true);
    try {
      const { error: upsertError } = await supabase
        .from('business_settings')
        .upsert({
          owner_id: user.id,
          ...updates,
          updated_at: new Date().toISOString()
        });

      if (upsertError) throw upsertError;
      await loadSettings();
    } catch (err) {
      setError((err as Error).message);
      console.error('Error updating settings:', err);
    } finally {
      setLoading(false);
    }
  }, [user, loadSettings]);

  return {
    settings,
    loading,
    error,
    loadSettings,
    updateSettings
  };
}
