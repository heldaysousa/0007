import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SettingsLayout } from './components/SettingsLayout';
import { GeneralSettings } from './sections/GeneralSettings';
import { TeamSettings } from './sections/TeamSettings';
import { CommissionSettings } from './sections/CommissionSettings';
import { motion } from 'framer-motion';

export default function Settings() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SettingsLayout>
        <Routes>
          <Route index element={<GeneralSettings />} />
          <Route path="equipe" element={<TeamSettings />} />
          <Route path="comissoes" element={<CommissionSettings />} />
          <Route path="*" element={<Navigate to="/configuracoes" replace />} />
        </Routes>
      </SettingsLayout>
    </motion.div>
  );
}
