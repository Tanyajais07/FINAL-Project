import React, { useMemo } from 'react';
import { AlertTriangle, Umbrella, Sun, Coffee, Wind, Mountain, Droplets } from 'lucide-react';
import { WeatherData } from '../types';
import { getRecommendation } from '../utils/recommendationUtils';

interface WeatherRecommendationProps {
  weatherData: WeatherData | null;
}

const WeatherRecommendation: React.FC<WeatherRecommendationProps> = ({ weatherData }) => {
  if (!weatherData) return null;

  const { recommendation, icon, color } = useMemo(() => 
    getRecommendation(weatherData),
  [weatherData]);

  const getIcon = () => {
    switch (icon) {
      case 'umbrella': return <Umbrella size={24} />;
      case 'sun': return <Sun size={24} />;
      case 'alert': return <AlertTriangle size={24} />;
      case 'coffee': return <Coffee size={24} />;
      case 'wind': return <Wind size={24} />;
      case 'mountain': return <Mountain size={24} />;
      case 'droplets': return <Droplets size={24} />;
      default: return <Sun size={24} />;
    }
  };

  return (
    <div className={`mt-6 rounded-xl p-5 backdrop-blur-md ${color} transition-all duration-300 transform hover:scale-[1.01]`}>
      <div className="flex items-center">
        <div className="mr-3 p-2 bg-white/10 rounded-full">
          {getIcon()}
        </div>
        <div>
          <h3 className="text-xl font-medium">Today's Recommendation</h3>
          <p className="text-white/80">{recommendation}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherRecommendation;