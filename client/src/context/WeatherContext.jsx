import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import axios from '../utils/axiosConfig';

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const { user } = useAuth();
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('default');

  useEffect(() => {
    console.log('WeatherContext: User changed', user);
    if (user && user.location) {
      console.log('WeatherContext: Fetching weather for location', user.location);
      fetchWeatherData(user.location);
    } else {
      console.log('WeatherContext: No user or location available');
      setLoading(false);
    }
  }, [user]);

  // Determine theme based on weather condition
  useEffect(() => {
    if (weatherData) {
      const condition = weatherData.weather[0].main.toLowerCase();
      
      if (condition.includes('clear') || condition.includes('sun')) {
        setTheme('sunny');
      } else if (condition.includes('rain')) {
        setTheme('rainy');
      } else if (condition.includes('cloud')) {
        setTheme('cloudy');
      } else if (condition.includes('snow')) {
        setTheme('snowy');
      } else if (condition.includes('thunder') || condition.includes('storm')) {
        setTheme('stormy');
      } else {
        setTheme('default');
      }
    }
  }, [weatherData]);

  // Fetch weather data from API
  const fetchWeatherData = async (location) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching weather data for location:', location);
      
      // Validate location data before making API calls
      if (!location || typeof location.lat !== 'number' || typeof location.lon !== 'number') {
        console.error('Invalid location data:', location);
        setError('Invalid location data');
        setLoading(false);
        return;
      }
      
      // Get current weather
      const weatherRes = await axios.get(`/api/weather/current?lat=${location.lat}&lon=${location.lon}`);
      console.log('Current weather response:', weatherRes.data);
      setWeatherData(weatherRes.data);
      
      // Get forecast
      const forecastRes = await axios.get(`/api/weather/forecast?lat=${location.lat}&lon=${location.lon}`);
      console.log('Forecast response:', forecastRes.data);
      setForecast(forecastRes.data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err.response?.data?.message || 'Failed to fetch weather data');
      toast.error(err.response?.data?.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  // Get weather by city name
  const getWeatherByCity = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      // Get current weather
      const weatherRes = await axios.get(`/api/weather/current/city?q=${city}`);
      setWeatherData(weatherRes.data);
      
      // Get forecast
      const forecastRes = await axios.get(`/api/weather/forecast/city?q=${city}`);
      setForecast(forecastRes.data);
      
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data');
      toast.error(err.response?.data?.message || 'Failed to fetch weather data');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get recommendations based on weather
  const getRecommendations = async () => {
    if (!weatherData) return null;
    
    try {
      const res = await axios.get(`/api/recommendations?weather=${weatherData.weather[0].main}&temp=${weatherData.main.temp}`);
      return res.data;
    } catch (err) {
      toast.error('Failed to fetch recommendations');
      return null;
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        forecast,
        loading,
        error,
        theme,
        fetchWeatherData,
        getWeatherByCity,
        getRecommendations
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
