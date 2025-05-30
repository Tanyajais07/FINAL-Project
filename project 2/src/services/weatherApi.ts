import axios from 'axios';
import { 
  CurrentWeatherResponse, 
  ForecastResponse,
  LocationSearchResult,
  DailyForecast,
  AirQualityData
} from '../types/weather';

// Replace with your API key or use environment variable
const API_KEY = '9de243494c0b295cca9337e1e96b00e2'; // OpenWeatherMap free API key
const BASE_URL = 'https://api.openweathermap.org/';

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric' // Change to 'imperial' for Fahrenheit
  }
});

export const fetchCurrentWeather = async (lat: number, lon: number): Promise<CurrentWeatherResponse> => {
  try {
    const response = await weatherApi.get('data/2.5/weather', {
      params: { lat, lon }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const fetchForecast = async (lat: number, lon: number): Promise<ForecastResponse> => {
  try {
    const response = await weatherApi.get('data/2.5/forecast', {
      params: { lat, lon }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

export const fetchAirQuality = async (lat: number, lon: number): Promise<AirQualityData> => {
  try {
    const response = await weatherApi.get('data/2.5/air_pollution', {
      params: { lat, lon }
    });
    return response.data.list[0];
  } catch (error) {
    console.error('Error fetching air quality:', error);
    throw error;
  }
};

export const searchLocation = async (query: string): Promise<LocationSearchResult[]> => {
  try {
    const response = await weatherApi.get('geo/1.0/direct', {
      params: {
        q: query,
        limit: 5
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching location:', error);
    throw error;
  }
};

export const processWeatherData = (current: CurrentWeatherResponse, forecast: ForecastResponse): {
  currentWeather: CurrentWeatherResponse,
  dailyForecasts: DailyForecast[]
} => {
  // Process forecast data to get daily forecasts
  const dailyForecasts: DailyForecast[] = [];
  const days: { [key: string]: ForecastResponse['list'] } = {};
  
  // Group forecast items by day
  forecast.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toISOString().split('T')[0];
    
    if (!days[day]) {
      days[day] = [];
    }
    
    days[day].push(item);
  });
  
  // Create daily forecast from grouped data
  Object.entries(days).forEach(([dayStr, items], index) => {
    // Skip today as we already have current weather
    if (index === 0 && Object.keys(days).length > 1) return;
    
    const date = new Date(dayStr);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    // Calculate min and max temperatures for the day
    const temps = items.map(item => item.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    
    // Use mid-day weather if available, otherwise first available
    const midDayItem = items.find(item => {
      const hour = new Date(item.dt * 1000).getHours();
      return hour >= 11 && hour <= 14;
    }) || items[0];
    
    // Calculate precipitation probability
    const precipitation = items.reduce((max, item) => Math.max(max, item.pop), 0) * 100;
    
    dailyForecasts.push({
      date,
      day: dayName,
      temp: {
        min: minTemp,
        max: maxTemp,
        day: midDayItem.main.temp,
      },
      weather: midDayItem.weather[0],
      precipitation,
      humidity: midDayItem.main.humidity,
      windSpeed: midDayItem.wind.speed
    });
  });
  
  return {
    currentWeather: current,
    dailyForecasts: dailyForecasts.slice(0, 7) // Limit to 7 days
  };
};

export const getWeatherBackground = (weather: string, isDay: boolean): string => {
  const lowerWeather = weather.toLowerCase();
  
  if (lowerWeather.includes('clear')) {
    return isDay ? 'weather-gradient-day' : 'weather-gradient-night';
  } else if (lowerWeather.includes('cloud') || lowerWeather.includes('overcast')) {
    return 'weather-gradient-cloudy';
  } else if (lowerWeather.includes('rain') || lowerWeather.includes('drizzle') || lowerWeather.includes('thunder')) {
    return 'weather-gradient-rain';
  } else if (lowerWeather.includes('snow')) {
    return 'weather-gradient-snow';
  } else if (lowerWeather.includes('dust') || lowerWeather.includes('sand') || lowerWeather.includes('haze')) {
    return 'weather-gradient-dust';
  } else {
    return isDay ? 'weather-gradient-day' : 'weather-gradient-night';
  }
};

export const getWeatherIconUrl = (icon: string): string => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

export default weatherApi;