import React from 'react';
import { Edit } from 'lucide-react';
import { Professional } from '../../../types/professional';
import { motion } from 'framer-motion';
import { Card, Title, Text } from '@tremor/react';

interface ProfessionalListProps {
  professionals: Professional[];
  onEdit: (professional: Professional) => void;
}

export function ProfessionalList({ professionals, onEdit }: ProfessionalListProps) {
  if (professionals.length === 0) {
    return (
      <div className="text-center py-8">
        <Text>Nenhum profissional cadastrado</Text>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <Title>Profissionais</Title>
      
      <div className="space-y-4">
        {professionals.map((professional) => (
          <Card key={professional.id}>
            <div className="flex justify-between items-start">
              <div>
                <Text>{professional.name}</Text>
                {professional.email && (
                  <Text className="text-gray-500">{professional.email}</Text>
                )}
              </div>
              <Text>{professional.base_commission_rate}%</Text>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
