import React, { useState, useEffect } from 'react';
import { Card, Title, Text } from '@tremor/react';
import { useSettings } from '../hooks/useSettings';
import { BusinessHoursForm } from '../components/BusinessHoursForm';
import { NotificationSettings } from '../components/NotificationSettings';
import { RevenueGoalsForm } from '../components/RevenueGoalsForm';
import { motion } from 'framer-motion';

export function GeneralSettings() {
  const { settings, loading, error, updateSettings, loadSettings } = useSettings();
  const [businessHours, setBusinessHours] = useState(settings?.business_hours || {});
  const [notificationPreferences, setNotificationPreferences] = useState(settings?.notification_preferences || { email: true, sms: false });
  const [dailyGoal, setDailyGoal] = useState(settings?.daily_revenue_goal || 1000);
  const [monthlyGoal, setMonthlyGoal] = useState(settings?.monthly_revenue_goal || 30000);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (settings) {
      setBusinessHours(settings.business_hours);
      setNotificationPreferences(settings.notification_preferences);
      setDailyGoal(settings.daily_revenue_goal);
      setMonthlyGoal(settings.monthly_revenue_goal);
    }
  }, [settings]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-purple" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        {error}
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    try {
      await updateSettings({
        business_hours: businessHours,
        notification_preferences: notificationPreferences,
        daily_revenue_goal: dailyGoal,
        monthly_revenue_goal: monthlyGoal
      });
      setSuccess(true);
    } catch (err) {
      console.error('Error updating settings:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <Title>Configurações Gerais</Title>
        <Text>Gerencie as configurações do seu negócio</Text>
      </div>

      <Card>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Horário de Funcionamento
        </h3>
        <BusinessHoursForm
          value={businessHours}
          onChange={setBusinessHours}
        />
      </Card>

      <Card>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Notificações
        </h3>
        <NotificationSettings
          value={notificationPreferences}
          onChange={setNotificationPreferences}
        />
      </Card>

      <Card>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Metas de Faturamento
        </h3>
        <RevenueGoalsForm
          dailyGoal={dailyGoal}
          monthlyGoal={monthlyGoal}
          onSave={async (goals) => {
            setDailyGoal(goals.dailyGoal);
            setMonthlyGoal(goals.monthlyGoal);
            await handleSave();
          }}
        />
      </Card>

      {success && (
        <div className="rounded-md bg-green-50 p-4">
          <p className="text-sm font-medium text-green-800">
            Configurações salvas com sucesso!
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </div>
    </motion.div>
  );
}
