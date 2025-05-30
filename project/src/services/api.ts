import axios from 'axios';

const WEATHER_API_KEY = '07aba6ca763144e4a67170619251505';
const NEWS_API_KEY = '47092c6c11604ea69dc4a57b13a0e6de';

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    feelslike_c: number;
  };
}

export const getWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`
    );
    if (!response.data) {
      throw new Error('No data received from weather API');
    }
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(`Weather API error: ${error.response.data.error?.message || 'Unknown error'}`);
    }
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
};

export const getNewsData = async (query: string) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}`
    );
    if (!response.data) {
      throw new Error('No data received from news API');
    }
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(`News API error: ${error.response.data.message || 'Unknown error'}`);
    }
    throw new Error(`Failed to fetch news data: ${error.message}`);
  }
};