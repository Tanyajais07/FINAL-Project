import React from 'react';
import { motion } from 'framer-motion';
import { DailyForecast } from '../types/weather';
import { getWeatherIconUrl } from '../services/weatherApi';
import { Droplets, Wind } from 'lucide-react';

interface ForecastCardProps {
  forecast: DailyForecast;
  index: number;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, index }) => {
  return (
    <motion.div 
      className="glass-card p-4 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
    >
      <span className="font-medium text-gray-700 mb-2">{forecast.day}</span>
      
      <motion.div
        className="my-2"
        animate={{ y: [0, -4, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 3,
          ease: "easeInOut",
          delay: index * 0.2
        }}
      >
        <img 
          src={getWeatherIconUrl(forecast.weather.icon)} 
          alt={forecast.weather.description} 
          className="w-14 h-14"
        />
      </motion.div>
      
      <p className="text-sm capitalize mb-1">{forecast.weather.description}</p>
      
      <div className="flex gap-2 font-semibold mb-3">
        <span>{Math.round(forecast.temp.max)}°</span>
        <span className="text-gray-500">{Math.round(forecast.temp.min)}°</span>
      </div>
      
      <div className="w-full mt-auto grid grid-cols-2 gap-1 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <Droplets size={12} className="text-primary-500" />
          <span>{forecast.humidity}%</span>
        </div>
        <div className="flex items-center gap-1 justify-end">
          <Wind size={12} className="text-primary-500" />
          <span>{Math.round(forecast.windSpeed * 3.6)} km/h</span>
        </div>
      </div>
      
      {forecast.precipitation > 0 && (
        <div className="w-full mt-2 bg-blue-50 text-blue-700 rounded-md px-2 py-1 text-xs font-medium text-center">
          {Math.round(forecast.precipitation)}% chance of rain
        </div>
      )}
    </motion.div>
  );
};

export default ForecastCard;