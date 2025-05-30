import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, Sun } from 'lucide-react';

interface BackgroundAnimationProps {
  weatherType: string;
  isDay: boolean;
}

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ weatherType, isDay }) => {
  const lowerWeather = weatherType.toLowerCase();
  
  // Determine which animation to show based on weather type
  const renderAnimationElements = () => {
    if (lowerWeather.includes('clear')) {
      return isDay ? <SunnyAnimation /> : <ClearNightAnimation />;
    } else if (lowerWeather.includes('cloud')) {
      return <CloudyAnimation />;
    } else if (lowerWeather.includes('rain') || lowerWeather.includes('drizzle')) {
      return <RainAnimation />;
    } else if (lowerWeather.includes('thunder')) {
      return <ThunderAnimation />;
    } else if (lowerWeather.includes('snow')) {
      return <SnowAnimation />;
    } else {
      return isDay ? <SunnyAnimation /> : <ClearNightAnimation />;
    }
  };

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {renderAnimationElements()}
    </div>
  );
};

const SunnyAnimation = () => {
  return (
    <motion.div 
      className="absolute top-12 right-12 text-yellow-300 opacity-70"
      animate={{ 
        rotate: 360,
        scale: [1, 1.05, 1]
      }}
      transition={{ 
        rotate: { duration: 50, repeat: Infinity, ease: "linear" },
        scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <Sun size={120} />
    </motion.div>
  );
};

const ClearNightAnimation = () => {
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => {
        const top = Math.random() * 90;
        const left = Math.random() * 95;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 3 + 2;
        
        return (
          <motion.div 
            key={i}
            className="absolute bg-white rounded-full shadow-glow"
            style={{ 
              top: `${top}%`, 
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`
            }}
            animate={{ 
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ 
              duration,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        );
      })}
    </>
  );
};

const CloudyAnimation = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => {
        const top = Math.random() * 60;
        const left = i * 20 - 10;
        const size = Math.random() * 0.5 + 0.8;
        const duration = Math.random() * 150 + 150;
        const delay = Math.random() * 10;
        
        return (
          <motion.div 
            key={i}
            className="absolute text-gray-300/30"
            style={{ 
              top: `${top}%`, 
              left: `${left}%`,
            }}
            animate={{ 
              x: ['0%', '110%'],
              scale: size
            }}
            transition={{ 
              duration,
              repeat: Infinity,
              delay
            }}
          >
            <Cloud size={100} />
          </motion.div>
        );
      })}
    </>
  );
};

const RainAnimation = () => {
  return (
    <>
      <CloudyAnimation />
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => {
          const left = Math.random() * 100;
          const animationDuration = Math.random() * 0.7 + 0.7;
          const delay = Math.random() * 5;
          const height = Math.random() * 20 + 15;
          
          return (
            <motion.div 
              key={i}
              className="absolute top-0 bg-blue-300/30 rounded-full"
              style={{ 
                left: `${left}%`, 
                width: '1px',
                height: `${height}px`
              }}
              animate={{ 
                y: ['0vh', '100vh']
              }}
              transition={{ 
                duration: animationDuration,
                repeat: Infinity,
                delay,
                ease: "linear"
              }}
            />
          );
        })}
      </div>
    </>
  );
};

const ThunderAnimation = () => {
  return (
    <>
      <RainAnimation />
      {Array.from({ length: 3 }).map((_, i) => {
        const left = 20 + Math.random() * 60;
        const top = 20 + Math.random() * 30;
        const delay = Math.random() * 7 + i * 3;
        
        return (
          <motion.div 
            key={i}
            className="absolute text-yellow-400"
            style={{ 
              top: `${top}%`, 
              left: `${left}%`
            }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [0.8, 1.2, 1]
            }}
            transition={{ 
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: delay
            }}
          >
            <CloudLightning size={60} />
          </motion.div>
        );
      })}
    </>
  );
};

const SnowAnimation = () => {
  return (
    <>
      <CloudyAnimation />
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => {
          const left = Math.random() * 100;
          const delay = Math.random() * 5;
          const size = Math.random() * 8 + 5;
          const duration = Math.random() * 7 + 10;
          
          return (
            <motion.div 
              key={i}
              className="absolute top-0 text-white opacity-70"
              style={{ 
                left: `${left}%`
              }}
              animate={{ 
                y: ['0vh', '100vh'],
                x: ['-10px', '10px', '-5px', '5px', '0px'],
                rotate: [0, 180]
              }}
              transition={{ 
                y: { duration, repeat: Infinity, delay, ease: "linear" },
                x: { duration: duration / 2, repeat: Infinity, repeatType: "reverse" },
                rotate: { duration: duration / 2, repeat: Infinity, ease: "linear" }
              }}
            >
              <CloudSnow size={size} />
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default BackgroundAnimation;