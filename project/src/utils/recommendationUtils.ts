import { WeatherData } from '../types';

export const getRecommendation = (weatherData: WeatherData): {
  recommendation: string;
  icon: string;
  color: string;
} => {
  const { current, forecast } = weatherData;
  const condition = current.condition.code;
  const temp = current.temp_c;
  const willRainToday = forecast.forecastday[0].day.daily_chance_of_rain > 50;
  const isHot = temp > 30;
  const isCold = temp < 15;
  const isWindy = current.wind_kph > 30;
  const isNice = temp >= 22 && temp <= 28 && current.humidity < 70 && !isWindy;
  
  // Rainy conditions
  if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(condition) || willRainToday) {
    return {
      recommendation: "It's going to rain today. Don't forget to carry an umbrella or raincoat!",
      icon: 'umbrella',
      color: 'bg-blue-900/30'
    };
  }
  
  // Thunderstorm
  if ([1087, 1273, 1276, 1279, 1282].includes(condition)) {
    return {
      recommendation: "Thunderstorms expected. It's best to stay indoors and avoid open areas.",
      icon: 'alert',
      color: 'bg-amber-900/30'
    };
  }
  
  // Snow
  if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(condition)) {
    return {
      recommendation: "It's snowing! Dress warmly and be careful on slippery surfaces.",
      icon: 'droplets',
      color: 'bg-sky-900/30'
    };
  }
  
  // Very hot
  if (isHot) {
    return {
      recommendation: "It's very hot today. Stay hydrated, wear loose clothing, and avoid extended exposure to the sun.",
      icon: 'sun',
      color: 'bg-orange-900/30'
    };
  }
  
  // Cold
  if (isCold) {
    return {
      recommendation: "It's quite cold today. Dress in layers and consider having a hot beverage to keep warm.",
      icon: 'coffee',
      color: 'bg-indigo-900/30'
    };
  }
  
  // Windy
  if (isWindy) {
    return {
      recommendation: "It's quite windy today. Secure loose objects outdoors and be cautious while driving.",
      icon: 'wind',
      color: 'bg-slate-900/30'
    };
  }
  
  // Nice weather
  if (isNice) {
    return {
      recommendation: "Perfect weather for outdoor activities! Great day to explore tourist attractions in the area.",
      icon: 'mountain',
      color: 'bg-green-900/30'
    };
  }
  
  // Default recommendation
  return {
    recommendation: "Today's weather is moderate. A good day to go out, but check the forecast before planning longer trips.",
    icon: 'sun',
    color: 'bg-sky-900/30'
  };
};