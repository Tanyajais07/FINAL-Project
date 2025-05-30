import { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import { searchLocation } from '../services/weatherApi';
import { LocationSearchResult } from '../types/weather';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onLocationSelect: (location: LocationSearchResult) => void;
  initialLocation?: string;
}

const SearchBar = ({ onLocationSelect, initialLocation = '' }: SearchBarProps) => {
  const [query, setQuery] = useState(initialLocation);
  const [results, setResults] = useState<LocationSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const searchResults = await searchLocation(query);
        setResults(searchResults);
      } catch (error) {
        console.error('Error searching locations:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounce = setTimeout(handleSearch, 500);
    return () => clearTimeout(debounce);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectLocation = (location: LocationSearchResult) => {
    onLocationSelect(location);
    setQuery(`${location.name}, ${location.country}`);
    setShowResults(false);
  };

  const handleFocus = () => {
    if (query && results.length > 0) {
      setShowResults(true);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto relative z-10" ref={searchRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onClick={() => setShowResults(true)}
          placeholder="Search for a city..."
          className="w-full py-3 pl-12 pr-4 glass-card bg-white/80 focus:bg-white/90 transition-colors 
                    text-gray-700 outline-none placeholder:text-gray-500"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={20} />
        </div>
        <AnimatePresence>
          {isSearching && (
            <motion.div 
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-5 h-5 border-t-2 border-primary-500 rounded-full animate-spin"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {showResults && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto z-20"
          >
            {results.map((result, index) => (
              <div
                key={`${result.lat}-${result.lon}-${index}`}
                onClick={() => handleSelectLocation(result)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <MapPin size={18} className="text-primary-500 shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">{result.name}</p>
                  <p className="text-sm text-gray-500">
                    {result.state ? `${result.state}, ` : ''}{result.country}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;