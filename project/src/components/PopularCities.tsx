import React from 'react';
import { Link } from 'react-router-dom';
import { popularCities } from '../data/upCities';
import { ArrowRight } from 'lucide-react';

interface PopularCitiesProps {
  onCitySelect: (city: any) => void;
}

const PopularCities: React.FC<PopularCitiesProps> = ({ onCitySelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {popularCities.map((city) => (
        <Link
          to={`/city/${city.id}`}
          key={city.id}
          className="relative overflow-hidden rounded-xl group h-48"
          onClick={() => onCitySelect(city)}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${city.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <h3 className="text-xl font-bold text-white">{city.name}</h3>
            <p className="text-sm text-white/80">{city.district} District</p>
            
            <div className="mt-2 flex items-center text-sky-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-sm">Explore</span>
              <ArrowRight size={16} className="ml-1" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PopularCities;