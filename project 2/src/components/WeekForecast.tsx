import React from 'react';
import { motion } from 'framer-motion';
import { DailyForecast } from '../types/weather';
import ForecastCard from './ForecastCard';

interface WeekForecastProps {
  forecasts: DailyForecast[];
}

const WeekForecast: React.FC<WeekForecastProps> = ({ forecasts }) => {
  return (
    <motion.div
      className="w-full mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">7-Day Forecast</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {forecasts.map((forecast, index) => (
          <ForecastCard 
            key={index} 
            forecast={forecast} 
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default WeekForecast;