export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Clouds {
  all: number;
}

export interface Rain {
  "1h"?: number;
  "3h"?: number;
}

export interface Snow {
  "1h"?: number;
  "3h"?: number;
}

export interface Sys {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface CurrentWeatherResponse {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  rain?: Rain;
  snow?: Snow;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastItem {
  dt: number;
  main: MainWeatherData;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number; // Probability of precipitation
  rain?: Rain;
  snow?: Snow;
  dt_txt: string;
}

export interface City {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: City;
}

export interface DailyForecast {
  date: Date;
  day: string;
  temp: {
    min: number;
    max: number;
    day: number;
  };
  weather: Weather;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

export interface AirQualityData {
  aqi: number; // 1-5 scale (Good to Very Poor)
  components: {
    co: number;   // Carbon monoxide (μg/m3)
    no: number;   // Nitrogen monoxide (μg/m3)
    no2: number;  // Nitrogen dioxide (μg/m3)
    o3: number;   // Ozone (μg/m3)
    so2: number;  // Sulphur dioxide (μg/m3)
    pm2_5: number; // Fine particles (μg/m3)
    pm10: number;  // Coarse particles (μg/m3)
    nh3: number;   // Ammonia (μg/m3)
  };
}

export interface LocationSearchResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}