import React from 'react';
import { motion } from 'framer-motion';
import { 
  Droplets, 
  Wind, 
  Thermometer,
  Eye, 
  Sunrise, 
  Sunset, 
  ArrowDown,
  ArrowUp
} from 'lucide-react';
import { CurrentWeatherResponse } from '../types/weather';
import { getWeatherIconUrl } from '../services/weatherApi';

interface CurrentWeatherProps {
  data: CurrentWeatherResponse;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const isDay = new Date().getTime() / 1000 > data.sys.sunrise && new Date().getTime() / 1000 < data.sys.sunset;
  
  // Convert sunrise and sunset timestamps to local time
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const sunriseTime = formatTime(data.sys.sunrise);
  const sunsetTime = formatTime(data.sys.sunset);

  return (
    <motion.div 
      className="w-full glass-card p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            {data.name}, {data.sys.country}
          </h2>
          <p className="text-gray-600 mb-4">
            {new Date().toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="temp-circle flex justify-center items-center bg-primary-500 text-white rounded-full h-24 w-24">
              <span className="text-3xl font-bold">{Math.round(data.main.temp)}°</span>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-gray-800 capitalize">
                {data.weather[0].description}
              </h3>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="flex items-center gap-1">
                  <ArrowUp size={14} className="text-primary-500" />
                  <span>{Math.round(data.main.temp_max)}°</span>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowDown size={14} className="text-primary-500" />
                  <span>{Math.round(data.main.temp_min)}°</span>
                </div>
              </div>
              <p className="text-gray-600 mt-1">
                Feels like {Math.round(data.main.feels_like)}°
              </p>
            </div>
          </div>
        </div>
        
        <motion.div 
          className="animate-weather-icon"
          animate={{ y: [0, -5, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            ease: "easeInOut"
          }}
        >
          <img 
            src={getWeatherIconUrl(data.weather[0].icon)} 
            alt={data.weather[0].description} 
            className="w-32 h-32 object-contain"
          />
        </motion.div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="p-3 bg-white/60 rounded-xl">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Droplets size={18} className="text-primary-500" />
            <span className="text-sm">Humidity</span>
          </div>
          <p className="text-xl font-semibold text-gray-800">{data.main.humidity}%</p>
        </div>
        
        <div className="p-3 bg-white/60 rounded-xl">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Wind size={18} className="text-primary-500" />
            <span className="text-sm">Wind Speed</span>
          </div>
          <p className="text-xl font-semibold text-gray-800">{Math.round(data.wind.speed * 3.6)} km/h</p>
        </div>
        
        <div className="p-3 bg-white/60 rounded-xl">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Thermometer size={18} className="text-primary-500" />
            <span className="text-sm">Pressure</span>
          </div>
          <p className="text-xl font-semibold text-gray-800">{data.main.pressure} hPa</p>
        </div>
        
        <div className="p-3 bg-white/60 rounded-xl">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Eye size={18} className="text-primary-500" />
            <span className="text-sm">Visibility</span>
          </div>
          <p className="text-xl font-semibold text-gray-800">{(data.visibility / 1000).toFixed(1)} km</p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-center py-3 px-6 bg-white/60 rounded-xl">
        <div className="flex flex-col items-center">
          <Sunrise size={22} className="text-accent-500 mb-1" />
          <span className="text-sm text-gray-600">Sunrise</span>
          <span className="font-medium">{sunriseTime}</span>
        </div>
        
        <div className="h-16 w-px bg-gray-200"></div>
        
        <div className="flex flex-col items-center">
          <Sunset size={22} className="text-accent-500 mb-1" />
          <span className="text-sm text-gray-600">Sunset</span>
          <span className="font-medium">{sunsetTime}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;