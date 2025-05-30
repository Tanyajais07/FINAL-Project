import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { cities } from '../data/upCities';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onCitySelect: (city: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const searchTerm = query.toLowerCase();
      const searchResults = cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm) ||
        city.district.toLowerCase().includes(searchTerm) ||
        (city.about && city.about.toLowerCase().includes(searchTerm))
      );
      
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSelectCity = (city: any) => {
    onCitySelect(city);
    setQuery(city.name);
    setIsOpen(false);
    navigate(`/city/${city.id}`);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative flex items-center">
        <div className="absolute left-3 text-white/60">
          <Search size={20} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city in Uttar Pradesh..."
          className="w-full pl-10 pr-10 py-3 bg-white/10 backdrop-blur-md text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
        />
        {query && (
          <button 
            className="absolute right-3 text-white/60 hover:text-white"
            onClick={clearSearch}
          >
            <X size={20} />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute mt-2 w-full bg-gradient-to-b from-slate-800 to-slate-900 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden z-10 border border-white/10">
          <ul>
            {results.map((city) => (
              <li key={city.id} className="border-b border-white/10 last:border-none">
                <button
                  className="w-full px-4 py-3 text-left flex items-center hover:bg-white/10 transition-colors"
                  onClick={() => handleSelectCity(city)}
                >
                  <MapPin size={16} className="mr-2 text-red-400 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{city.name}</div>
                    <div className="text-xs text-white/70">{city.district} District, Uttar Pradesh</div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && query.length > 0 && results.length === 0 && (
        <div className="absolute mt-2 w-full bg-gradient-to-b from-slate-800 to-slate-900 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden z-10 border border-white/10 p-4 text-center text-white/70">
          No cities found matching "{query}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;