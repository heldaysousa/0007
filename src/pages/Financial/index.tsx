import React from 'react';
    import { motion } from 'framer-motion';

    export default function Financial() {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1>Página Financeiro</h1>
        </motion.div>
      );
    }
