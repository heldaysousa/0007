import React from 'react';
import { Title, Text, Grid, Metric, Flex } from '@tremor/react';
import { useCommissionDashboard } from '../../hooks/useCommissionDashboard';
import { CommissionCard } from './CommissionCard';
import { motion } from 'framer-motion';

export function CommissionDashboard() {
  const { data, loading, error } = useCommissionDashboard();

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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
        <Card>
          <Title>Total em Comissões</Title>
          <Metric>{data.totalCommissions.toFixed(2)}</Metric>
        </Card>
        <Card>
          <Title>Comissões Pendentes</Title>
          <Metric>{data.pendingCommissions.toFixed(2)}</Metric>
        </Card>
        <Card>
          <Title>Taxa Média</Title>
          <Metric>{data.averageRate.toFixed(1)}%</Metric>
        </Card>
      </Grid>

      <Card>
        <Title>Top Profissionais</Title>
        <div className="mt-4 space-y-4">
          {data.topProfessionals.map((professional) => (
            <div key={professional.name} className="border-b last:border-0 pb-4">
              <Flex>
                <div>
                  <Text>{professional.name}</Text>
                  <Text className="text-gray-500">
                    {professional.completedServices} serviços realizados
                  </Text>
                </div>
                <Text>{formatCurrency(professional.totalCommissions)}</Text>
              </Flex>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
