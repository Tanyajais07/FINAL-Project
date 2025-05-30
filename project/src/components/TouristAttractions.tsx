import React from 'react';
import { ExternalLink, MapPin, Calendar, Info } from 'lucide-react';
import { WeatherData } from '../types';

interface TouristAttractionsProps {
  city: any;
  weatherData: WeatherData | null;
}

const TouristAttractions: React.FC<TouristAttractionsProps> = ({ city, weatherData }) => {
  if (!city.attractions || city.attractions.length === 0) {
    return (
      <div className="text-center py-8">
        <Info size={48} className="mx-auto mb-4 text-sky-400 opacity-50" />
        <h3 className="text-xl font-medium">No tourist attractions found</h3>
        <p className="text-white/70 mt-2">
          We don't have information about tourist attractions in {city.name} yet.
        </p>
      </div>
    );
  }

  const isGoodWeatherForTourism = weatherData ? 
    weatherData.current.condition.code < 1063 && weatherData.current.temp_c > 15 : 
    true;

  return (
    <div>
      <div className={`p-4 mb-6 rounded-lg ${
        isGoodWeatherForTourism ? 'bg-green-900/30' : 'bg-amber-900/30'
      }`}>
        <h3 className="text-lg font-medium">
          {isGoodWeatherForTourism 
            ? 'Great day for sightseeing!' 
            : 'Weather may affect some attractions'}
        </h3>
        <p className="text-white/80 text-sm">
          {isGoodWeatherForTourism
            ? 'The current weather is perfect for visiting outdoor attractions. Enjoy your trip!'
            : 'Some attractions may be affected by the current weather. Consider indoor options or check before visiting.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {city.attractions.map((attraction: any, index: number) => (
          <div 
            key={index} 
            className="backdrop-blur-md bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors"
          >
            <div 
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${attraction.image})` }}
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{attraction.name}</h3>
              
              <div className="flex items-center mt-2 text-sky-200">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm">{attraction.location}</span>
              </div>
              
              {attraction.timings && (
                <div className="flex items-center mt-1 text-sky-200">
                  <Calendar size={16} className="mr-1" />
                  <span className="text-sm">{attraction.timings}</span>
                </div>
              )}
              
              <p className="mt-3 text-white/80 text-sm">{attraction.description}</p>
              
              <div className="mt-4">
                <a 
                  href="#" 
                  className="inline-flex items-center text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <span>Learn more</span>
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TouristAttractions;