import React from 'react';
import { Cloud, Heart, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-950/50 backdrop-blur-md mt-12 border-t border-white/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Cloud className="text-sky-400 mr-2" size={24} />
            <span className="font-bold text-lg">WeatherUP</span>
          </div>

          <div className="flex space-x-6 text-white/70">
            <a href="#" className="hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-white/10 text-center text-white/60 text-sm">
          <p className="flex items-center justify-center">
            Made with <Heart size={14} className="mx-1 text-red-400" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;