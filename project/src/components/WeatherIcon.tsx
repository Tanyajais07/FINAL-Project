import React from 'react';
import { Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, Sun, CloudSun, Wind, CloudFog } from 'lucide-react';

interface WeatherIconProps {
  code: number;
  isDay: number;
  size?: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ code, isDay, size = 24 }) => {
  // Map weather codes to appropriate icons
  const getIcon = () => {
    // Clear conditions
    if (code === 1000) {
      return isDay ? <Sun size={size} className="text-yellow-400" /> : <Sun size={size} className="text-yellow-200" />;
    }
    
    // Partly cloudy
    if (code === 1003) {
      return <CloudSun size={size} className="text-gray-200" />;
    }
    
    // Cloudy conditions
    if ([1006, 1009].includes(code)) {
      return <Cloud size={size} className="text-gray-300" />;
    }
    
    // Fog, mist
    if ([1030, 1135, 1147].includes(code)) {
      return <CloudFog size={size} className="text-gray-400" />;
    }
    
    // Rain conditions
    if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(code)) {
      return <CloudRain size={size} className="text-blue-300" />;
    }
    
    // Drizzle
    if ([1150, 1153, 1168, 1171].includes(code)) {
      return <CloudDrizzle size={size} className="text-blue-200" />;
    }
    
    // Snow
    if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) {
      return <CloudSnow size={size} className="text-white" />;
    }
    
    // Thunderstorm
    if ([1087, 1273, 1276, 1279, 1282].includes(code)) {
      return <CloudLightning size={size} className="text-yellow-300" />;
    }
    
    // Windy
    if ([1030, 1035].includes(code)) {
      return <Wind size={size} className="text-gray-300" />;
    }
    
    // Default
    return <Cloud size={size} className="text-gray-300" />;
  };

  return (
    <div className="inline-flex animate-pulse">
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;