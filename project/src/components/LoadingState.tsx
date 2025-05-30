import React from 'react';
import { Cloud } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-bounce">
        <Cloud size={48} className="text-sky-400" />
      </div>
      <h3 className="text-xl font-medium mt-4">Loading weather data...</h3>
      <p className="text-white/70 mt-2">Fetching the latest information for you</p>
    </div>
  );
};

export default LoadingState;