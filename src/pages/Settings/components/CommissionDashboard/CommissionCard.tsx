import React from 'react';
import { Card, Title, Text } from '@tremor/react';
import { formatCurrency } from '../../../../utils/format';

interface CommissionCardProps {
  title: string;
  value: number;
  isCurrency?: boolean;
  isPercentage?: boolean;
}

export function CommissionCard({ title, value, isCurrency, isPercentage }: CommissionCardProps) {
  const formattedValue = isCurrency 
    ? formatCurrency(value)
    : isPercentage 
      ? `${value.toFixed(1)}%`
      : value.toString();

  return (
    <Card>
      <Title>{title}</Title>
      <Text>{formattedValue}</Text>
    </Card>
  );
}
