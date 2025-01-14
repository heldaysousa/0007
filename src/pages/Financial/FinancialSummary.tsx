import React from 'react';
    import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';
    import { Card } from '../../components/ui/Card';
    import { formatCurrency } from '../../utils/format';
    import { calculateSummary } from './utils';
    import { FinancialSummaryProps } from './types';
    import { motion } from 'framer-motion';

    export function FinancialSummary({ transactions }: FinancialSummaryProps) {
      const { income, expenses, balance, profitMargin } = calculateSummary(transactions);

      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card
            title="Receitas"
            value={income}
            icon={<TrendingUp className="w-6 h-6" />}
            color="green"
          />
          
          <Card
            title="Despesas"
            value={expenses}
            icon={<TrendingDown className="w-6 h-6" />}
            color="rose"
          />
          
          <Card
            title="Saldo"
            value={balance}
            icon={<DollarSign className="w-6 h-6" />}
            color="blue"
          />
          
          <Card
            title="Margem de Lucro"
            value={profitMargin}
            icon={<Percent className="w-6 h-6" />}
            color="purple"
          />
        </motion.div>
      );
    }
