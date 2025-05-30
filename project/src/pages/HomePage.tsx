import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import CurrentWeather from '../components/CurrentWeather';
import WeatherForecast from '../components/WeatherForecast';
import PopularCities from '../components/PopularCities';
import WeatherRecommendation from '../components/WeatherRecommendation';
import { fetchWeatherData } from '../services/api';
import { defaultCity } from '../data/upCities';
import { WeatherData } from '../types';
import LoadingState from '../components/LoadingState';

const HomePage: React.FC = () => {
  const [city, setCity] = useState(defaultCity);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeatherData = async () => {
      setLoading(true);
      try {
        const data = await fetchWeatherData(city.name);
        setWeatherData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Could not load weather data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, [city]);

  const handleCityChange = (selectedCity: any) => {
    setCity(selectedCity);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-center mb-6">
          Weather Explorer <span className="text-yellow-400">Uttar Pradesh</span>
        </h1>
        <SearchBar onCitySelect={handleCityChange} />
      </section>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <div className="text-center p-8 bg-red-900/30 backdrop-blur-md rounded-xl">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          <CurrentWeather weatherData={weatherData} city={city} />
          <WeatherRecommendation weatherData={weatherData} />
          <WeatherForecast weatherData={weatherData} />
        </>
      )}

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Popular Destinations</h2>
        <PopularCities onCitySelect={handleCityChange} />
      </section>
    </div>
  );
};

export default HomePage;