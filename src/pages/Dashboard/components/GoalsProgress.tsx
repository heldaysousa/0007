import React from 'react';
    import { motion } from 'framer-motion';

    interface GoalsProgressProps {
      progress: number;
      goal: number;
    }

    export function GoalsProgress({ progress, goal }: GoalsProgressProps) {
      return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Progresso da Meta
          </h3>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, progress)}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-accent-purple dark:bg-accent"
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {progress.toFixed(1)}% de {goal}
            </p>
          </div>
        </div>
      );
    }
