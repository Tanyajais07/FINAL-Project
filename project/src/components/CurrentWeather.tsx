import React, { useMemo } from 'react';
import { Wind, Droplets, Thermometer, Sun, Clock, Navigation } from 'lucide-react';
import { WeatherData } from '../types';
import WeatherIcon from './WeatherIcon';
import { getFormattedTime, getFormattedDate } from '../utils/dateUtils';
import { getWeatherBackground } from '../utils/weatherUtils';

interface CurrentWeatherProps {
  weatherData: WeatherData | null;
  city: any;
  detailed?: boolean;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weatherData, city, detailed = false }) => {
  if (!weatherData) return null;

  const background = useMemo(() => 
    getWeatherBackground(weatherData.current.condition.code, weatherData.current.is_day),
  [weatherData.current.condition.code, weatherData.current.is_day]);

  const hourlyForecast = weatherData.forecast.forecastday[0].hour
    .filter(hour => {
      const hourTime = new Date(hour.time).getHours();
      const currentHour = new Date().getHours();
      return hourTime > currentHour;
    })
    .slice(0, 6);

  return (
    <div 
      className={`rounded-2xl overflow-hidden transition-all duration-1000 ease-out ${
        detailed ? '' : 'transform hover:scale-[1.02]'
      }`}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="backdrop-blur-sm bg-black/30 p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{city.name}</h2>
            <p className="text-sky-200">{getFormattedDate(new Date())}</p>
            <p className="text-white/70 text-sm">{getFormattedTime(new Date())}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end">
              <div className="mr-2">
                <WeatherIcon code={weatherData.current.condition.code} isDay={weatherData.current.is_day} size={64} />
              </div>
              <div className="text-6xl font-light">{Math.round(weatherData.current.temp_c)}°</div>
            </div>
            <p className="text-lg mt-1">{weatherData.current.condition.text}</p>
            <p className="text-sm text-white/70">
              Feels like {Math.round(weatherData.current.feelslike_c)}°
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <WeatherMetric 
            icon={<Wind size={20} />} 
            label="Wind" 
            value={`${weatherData.current.wind_kph} km/h`} 
            detail={<Navigation size={14} className="transform rotate-180" style={{ transform: `rotate(${weatherData.current.wind_degree}deg)` }} />}
          />
          <WeatherMetric 
            icon={<Droplets size={20} />} 
            label="Humidity" 
            value={`${weatherData.current.humidity}%`} 
          />
          <WeatherMetric 
            icon={<Sun size={20} />} 
            label="UV Index" 
            value={`${weatherData.current.uv}`} 
            detail={getUVLevel(weatherData.current.uv)}
          />
          <WeatherMetric 
            icon={<Thermometer size={20} />} 
            label="Min/Max" 
            value={`${Math.round(weatherData.forecast.forecastday[0].day.mintemp_c)}° / ${Math.round(weatherData.forecast.forecastday[0].day.maxtemp_c)}°`} 
          />
        </div>

        {detailed && (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <Clock size={18} className="mr-2" />
              Hourly Forecast
            </h3>
            <div className="grid grid-cols-6 gap-2">
              {hourlyForecast.map((hour, idx) => (
                <div key={idx} className="text-center py-2 px-1 rounded-lg backdrop-blur-md bg-white/5 hover:bg-white/10 transition-colors">
                  <p className="text-sm font-medium">{new Date(hour.time).getHours()}:00</p>
                  <WeatherIcon code={hour.condition.code} isDay={hour.is_day} size={32} />
                  <p className="text-xl font-medium">{Math.round(hour.temp_c)}°</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const WeatherMetric: React.FC<{ icon: React.ReactNode; label: string; value: string; detail?: React.ReactNode }> = ({ 
  icon, label, value, detail 
}) => (
  <div className="backdrop-blur-md bg-white/10 p-3 rounded-xl">
    <div className="flex items-center text-sky-200 mb-1">
      {icon}
      <span className="ml-2 text-sm font-medium">{label}</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-xl font-medium">{value}</span>
      {detail && <span className="text-xs text-white/70">{detail}</span>}
    </div>
  </div>
);

const getUVLevel = (uv: number) => {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very High";
  return "Extreme";
};

export default CurrentWeather;