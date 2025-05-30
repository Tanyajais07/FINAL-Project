import React from 'react';
import { motion } from 'framer-motion';
import useWeatherData from './hooks/useWeatherData';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeekForecast from './components/WeekForecast';
import WeatherChart from './components/WeatherChart';
import AirQualityCard from './components/AirQualityCard';
import BackgroundAnimation from './components/BackgroundAnimation';
import { getWeatherBackground } from './services/weatherApi';

function App() {
  const { 
    currentWeather, 
    forecast, 
    dailyForecasts,
    airQuality,
    loading, 
    error,
    updateLocation,
    isDay
  } = useWeatherData();

  // Determine the background class based on weather conditions
  const backgroundClass = currentWeather 
    ? getWeatherBackground(currentWeather.weather[0].main, isDay)
    : isDay ? 'weather-gradient-day' : 'weather-gradient-night';

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${backgroundClass}`}>
      {/* Weather animation background */}
      {currentWeather && (
        <BackgroundAnimation 
          weatherType={currentWeather.weather[0].main}
          isDay={isDay}
        />
      )}
      
      <div className="container mx-auto px-4 relative z-10 pb-12">
        <Header />
        
        <div className="my-6">
          <SearchBar onLocationSelect={updateLocation} />
        </div>
        
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500 border-opacity-50"></div>
          </div>
        )}
        
        {error && (
          <motion.div 
            className="glass-card p-6 mb-6 bg-red-50 border border-red-200 text-red-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-medium">{error}</p>
            <p className="mt-2 text-sm">Please check your connection and try again.</p>
          </motion.div>
        )}
        
        {!loading && !error && currentWeather && (
          <>
            {/* Current Weather */}
            <CurrentWeather data={currentWeather} />
            
            {/* Week Forecast */}
            {dailyForecasts.length > 0 && <WeekForecast forecasts={dailyForecasts} />}
            
            {/* Weather Charts */}
            {forecast && (
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <WeatherChart forecastData={forecast} type="temperature" />
                <WeatherChart forecastData={forecast} type="precipitation" />
              </div>
            )}
            
            {/* Air Quality */}
            {airQuality && <AirQualityCard data={airQuality} />}
          </>
        )}
        
        {/* App Footer */}
        <motion.footer 
          className="mt-12 text-center text-sm text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>Data provided by OpenWeatherMap</p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;