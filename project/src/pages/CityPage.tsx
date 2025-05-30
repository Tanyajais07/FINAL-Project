import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { cities } from '../data/upCities';
import { fetchWeatherData, fetchLocalNews } from '../services/api';
import { WeatherData, News } from '../types';
import CurrentWeather from '../components/CurrentWeather';
import TouristAttractions from '../components/TouristAttractions';
import CityInfo from '../components/CityInfo';
import LocalNews from '../components/LocalNews';
import LoadingState from '../components/LoadingState';

const CityPage: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [activeTab, setActiveTab] = useState('weather');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [newsData, setNewsData] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const city = cities.find(c => c.id === cityId) || cities[0];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const weather = await fetchWeatherData(city.name);
        setWeatherData(weather);
        
        const news = await fetchLocalNews(city.name, 'Uttar Pradesh');
        setNewsData(news);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Could not load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  const renderTabContent = () => {
    if (loading) return <LoadingState />;
    if (error) return <div className="text-red-400 p-4">{error}</div>;

    switch (activeTab) {
      case 'weather':
        return <CurrentWeather weatherData={weatherData} city={city} detailed />;
      case 'about':
        return <CityInfo city={city} />;
      case 'attractions':
        return <TouristAttractions city={city} weatherData={weatherData} />;
      case 'news':
        return <LocalNews news={newsData} city={city.name} />;
      default:
        return <CurrentWeather weatherData={weatherData} city={city} />;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center text-sky-300 hover:text-sky-100 transition-colors">
          <ArrowLeft size={20} className="mr-1" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center">
          {city.name}
          <MapPin size={24} className="ml-2 text-red-400" />
        </h1>
        <div className="text-sm text-sky-200">
          <div>{city.district} District</div>
          <div>Uttar Pradesh, India</div>
        </div>
      </div>

      <div className="backdrop-blur-md bg-white/10 rounded-xl overflow-hidden">
        <div className="flex border-b border-white/20">
          {['weather', 'about', 'attractions', 'news'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 capitalize font-medium transition-colors ${
                activeTab === tab 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default CityPage;