import React from 'react';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-4">
      <motion.div 
        className="container mx-auto flex justify-center items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-primary-500"
          >
            <Cloud size={32} />
          </motion.div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Real Time Weather Monitoring Application
          </h1>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;