import React from 'react';
import { motion } from 'framer-motion';
import { AirQualityData } from '../types/weather';
import { Wind } from 'lucide-react';

interface AirQualityCardProps {
  data: AirQualityData;
}

// AQI level descriptions
const AQI_LEVELS = [
  { level: 1, label: 'Good', color: 'bg-success-500', textColor: 'text-success-700' },
  { level: 2, label: 'Fair', color: 'bg-primary-500', textColor: 'text-primary-700' },
  { level: 3, label: 'Moderate', color: 'bg-accent-500', textColor: 'text-accent-700' },
  { level: 4, label: 'Poor', color: 'bg-warning-500', textColor: 'text-warning-700' },
  { level: 5, label: 'Very Poor', color: 'bg-error-500', textColor: 'text-error-700' },
];

const AirQualityCard: React.FC<AirQualityCardProps> = ({ data }) => {
  // Ensure AQI is a valid number between 1 and 5
  const clampedAqi = Math.max(1, Math.min(5, Math.round(data.aqi) || 1));
  
  // Get level based on clamped AQI
  const aqiLevel = AQI_LEVELS[clampedAqi - 1];
  
  // Calculate progress for AQI (0-100%)
  const progress = (clampedAqi / 5) * 100;

  return (
    <motion.div 
      className="glass-card p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Wind className="text-primary-500" size={22} />
        <h3 className="text-lg font-semibold text-gray-800">Air Quality Index</h3>
      </div>
      
      <div className="flex flex-col items-center mb-4">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
          <motion.div 
            className={`h-full ${aqiLevel.color}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        
        <div className="flex justify-between w-full px-1 text-xs text-gray-500">
          {AQI_LEVELS.map((level) => (
            <span key={level.level} className={clampedAqi === level.level ? level.textColor : ''}>
              {level.label}
            </span>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <div className="bg-white/60 p-2 rounded-lg">
          <span className="text-gray-500 text-xs">PM2.5</span>
          <p className="font-semibold">{data.components.pm2_5.toFixed(1)} μg/m³</p>
        </div>
        
        <div className="bg-white/60 p-2 rounded-lg">
          <span className="text-gray-500 text-xs">PM10</span>
          <p className="font-semibold">{data.components.pm10.toFixed(1)} μg/m³</p>
        </div>
        
        <div className="bg-white/60 p-2 rounded-lg">
          <span className="text-gray-500 text-xs">O₃ (Ozone)</span>
          <p className="font-semibold">{data.components.o3.toFixed(1)} μg/m³</p>
        </div>
        
        <div className="bg-white/60 p-2 rounded-lg">
          <span className="text-gray-500 text-xs">NO₂</span>
          <p className="font-semibold">{data.components.no2.toFixed(1)} μg/m³</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AirQualityCard;