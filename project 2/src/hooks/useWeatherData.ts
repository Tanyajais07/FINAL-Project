import { useState, useEffect } from 'react';
import { 
  fetchCurrentWeather, 
  fetchForecast, 
  fetchAirQuality,
  processWeatherData 
} from '../services/weatherApi';
import { 
  CurrentWeatherResponse, 
  ForecastResponse, 
  DailyForecast,
  AirQualityData,
  LocationSearchResult
} from '../types/weather';

interface WeatherData {
  currentWeather: CurrentWeatherResponse | null;
  forecast: ForecastResponse | null;
  dailyForecasts: DailyForecast[];
  airQuality: AirQualityData | null;
  loading: boolean;
  error: string | null;
}

const useWeatherData = (initialCoords?: { lat: number; lon: number }) => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(initialCoords || null);
  const [data, setData] = useState<WeatherData>({
    currentWeather: null,
    forecast: null,
    dailyForecasts: [],
    airQuality: null,
    loading: true,
    error: null,
  });

  // Get user's current location if not provided
  useEffect(() => {
    if (!coords) {
      // Default to New York if geolocation is not available
      const defaultCoords = { lat: 40.7128, lon: -74.0060 };
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoords({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          () => {
            // Fallback to default coordinates if geolocation fails
            setCoords(defaultCoords);
          }
        );
      } else {
        // Fallback to default coordinates if geolocation is not supported
        setCoords(defaultCoords);
      }
    }
  }, []);

  // Fetch weather data when coordinates are available
  useEffect(() => {
    const fetchData = async () => {
      if (!coords) return;

      setData(prev => ({ ...prev, loading: true, error: null }));

      try {
        // Fetch all data in parallel
        const [currentData, forecastData, airQualityData] = await Promise.all([
          fetchCurrentWeather(coords.lat, coords.lon),
          fetchForecast(coords.lat, coords.lon),
          fetchAirQuality(coords.lat, coords.lon),
        ]);

        const { currentWeather, dailyForecasts } = processWeatherData(currentData, forecastData);

        setData({
          currentWeather,
          forecast: forecastData,
          dailyForecasts,
          airQuality: airQualityData,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch weather data. Please try again later.',
        }));
      }
    };

    fetchData();
  }, [coords]);

  // Function to update location
  const updateLocation = (location: LocationSearchResult) => {
    setCoords({
      lat: location.lat,
      lon: location.lon,
    });
  };

  return {
    ...data,
    updateLocation,
    isDay: data.currentWeather 
      ? new Date().getTime() / 1000 > data.currentWeather.sys.sunrise && 
        new Date().getTime() / 1000 < data.currentWeather.sys.sunset
      : true
  };
};

export default useWeatherData;