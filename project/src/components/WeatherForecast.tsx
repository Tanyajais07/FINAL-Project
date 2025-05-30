import React from 'react';
import { WeatherData } from '../types';
import WeatherIcon from './WeatherIcon';
import { Calendar, Droplets, Wind } from 'lucide-react';
import { getDayName } from '../utils/dateUtils';

interface WeatherForecastProps {
  weatherData: WeatherData | null;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Calendar className="mr-2" size={24} />
        7-Day Forecast
      </h2>
      <div className="backdrop-blur-md bg-white/10 rounded-xl overflow-hidden">
        {weatherData.forecast.forecastday.map((day, index) => (
          <div 
            key={day.date}
            className={`p-4 flex items-center justify-between ${
              index !== weatherData.forecast.forecastday.length - 1 ? 'border-b border-white/10' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 text-center font-medium">
                {index === 0 ? 'Today' : getDayName(new Date(day.date))}
              </div>
              <div className="flex items-center space-x-2">
                <WeatherIcon code={day.day.condition.code} isDay={1} size={36} />
                <div className="hidden sm:block text-sm max-w-[120px] truncate">
                  {day.day.condition.text}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-1 text-sky-200">
                <Droplets size={16} />
                <span className="text-sm">{day.day.daily_chance_of_rain}%</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-1 text-sky-200">
                <Wind size={16} />
                <span className="text-sm">{Math.round(day.day.maxwind_kph)} km/h</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-sm text-sky-200">{Math.round(day.day.mintemp_c)}°</span>
                <div className="w-20 bg-gradient-to-r from-blue-500 to-yellow-500 h-1.5 rounded">
                </div>
                <span className="font-medium">{Math.round(day.day.maxtemp_c)}°</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;