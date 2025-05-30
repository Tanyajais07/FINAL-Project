import React from 'react';
import { MapPin, Users, History, Globe } from 'lucide-react';

interface CityInfoProps {
  city: any;
}

const CityInfo: React.FC<CityInfoProps> = ({ city }) => {
  return (
    <div className="space-y-6">
      <div 
        className="h-48 rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(${city.image})` }}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoCard
          icon={<MapPin size={20} />}
          title="Location"
          value={`${city.district} District, Uttar Pradesh`}
          color="bg-blue-900/30"
        />
        <InfoCard
          icon={<Users size={20} />}
          title="Population"
          value={city.population ? city.population.toLocaleString() : 'Unknown'}
          color="bg-green-900/30"
        />
        <InfoCard
          icon={<Globe size={20} />}
          title="Area"
          value={city.area ? `${city.area} km²` : 'Unknown'}
          color="bg-purple-900/30"
        />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">About {city.name}</h2>
        <div className="backdrop-blur-md bg-white/5 p-4 rounded-xl">
          <p className="text-white/80">
            {city.about || `${city.name} is a city/town located in the ${city.district} district of Uttar Pradesh, India. It is known for its cultural heritage and historical significance in the region.`}
          </p>
        </div>
      </div>
      
      {city.history && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center">
            <History size={24} className="mr-2" />
            History
          </h2>
          <div className="backdrop-blur-md bg-white/5 p-4 rounded-xl">
            <p className="text-white/80">{city.history}</p>
          </div>
        </div>
      )}
      
      {city.culture && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Culture & Lifestyle</h2>
          <div className="backdrop-blur-md bg-white/5 p-4 rounded-xl">
            <p className="text-white/80">{city.culture}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoCard: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  value: string;
  color: string;
}> = ({ icon, title, value, color }) => (
  <div className={`p-4 rounded-xl ${color} backdrop-blur-md`}>
    <div className="flex items-center mb-2">
      {icon}
      <h3 className="ml-2 font-medium">{title}</h3>
    </div>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default CityInfo;