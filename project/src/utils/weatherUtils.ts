import { WeatherData } from '../types';

export const getWeatherBackground = (conditionCode: number, isDay: number): string => {
  // Clear
  if (conditionCode === 1000) {
    return isDay 
      ? 'https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg'  // Sunny
      : 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg'; // Clear night
  }
  
  // Partly cloudy
  if (conditionCode === 1003) {
    return isDay
      ? 'https://images.pexels.com/photos/3768/sky-sunny-clouds-cloudy.jpg'   // Partly cloudy day
      : 'https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg';    // Partly cloudy night
  }
  
  // Cloudy
  if ([1006, 1009].includes(conditionCode)) {
    return 'https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg';
  }
  
  // Foggy, misty
  if ([1030, 1135, 1147].includes(conditionCode)) {
    return 'https://images.pexels.com/photos/226460/pexels-photo-226460.jpeg';
  }
  
  // Rain
  if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(conditionCode)) {
    return 'https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg';
  }
  
  // Thunderstorm
  if ([1087, 1273, 1276, 1279, 1282].includes(conditionCode)) {
    return 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg';
  }
  
  // Snow
  if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(conditionCode)) {
    return 'https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg';
  }
  
  // Default background
  return 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg';
};

export const getTemperatureColor = (temp: number): string => {
  if (temp < 0) return '#9CA3AF'; // cold gray
  if (temp < 10) return '#93C5FD'; // light blue
  if (temp < 20) return '#60A5FA'; // blue
  if (temp < 25) return '#34D399'; // green
  if (temp < 30) return '#FBBF24'; // yellow
  if (temp < 35) return '#F59E0B'; // amber
  return '#EF4444'; // red
};