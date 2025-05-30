import React from 'react';
import { News } from '../types';
import { Calendar, ExternalLink, RefreshCw } from 'lucide-react';

interface LocalNewsProps {
  news: News[];
  city: string;
}

const LocalNews: React.FC<LocalNewsProps> = ({ news, city }) => {
  if (!news || news.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <RefreshCw size={48} className="text-sky-400 mb-4" />
        <h3 className="text-xl font-medium">No recent news</h3>
        <p className="text-white/70 text-center max-w-md mt-2">
          We couldn't find any recent news for {city}. Check back later for updates.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Latest News from {city}</h2>
      
      <div className="space-y-4">
        {news.map((item, index) => (
          <div 
            key={index}
            className="backdrop-blur-md bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors"
          >
            <div className="p-4">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              
              <div className="flex items-center mt-2 text-sky-200">
                <Calendar size={16} className="mr-1" />
                <span className="text-sm">{new Date(item.publishedAt).toLocaleDateString()}</span>
              </div>
              
              <p className="mt-3 text-white/80">{item.description}</p>
              
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-white/60">{item.source.name}</span>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <span>Read full article</span>
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

export default LocalNews;