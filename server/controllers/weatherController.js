import asyncHandler from 'express-async-handler';
import axios from 'axios';

const createPlaceholderWeather = (options = {}) => {
  const now = Math.floor(Date.now() / 1000);
  return {
    coord: {
      lon: options.lon || 0,
      lat: options.lat || 0
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d'
      }
    ],
    base: 'stations',
    main: {
      temp: 293.15,
      feels_like: 293.15,
      temp_min: 293.15,
      temp_max: 295.15,
      pressure: 1013,
      humidity: 40
    },
    visibility: 10000,
    wind: {
      speed: 3.6,
      deg: 120
    },
    clouds: {
      all: 0
    },
    dt: now,
    sys: {
      type: 1,
      id: 1,
      country: options.country || 'US',
      sunrise: now - 3600,
      sunset: now + 3600
    },
    timezone: 0,
    id: 0,
    name: options.name || 'WeatherWhiz City',
    cod: 200
  };
};

const createPlaceholderForecast = (options = {}) => {
  const now = Math.floor(Date.now() / 1000);
  const list = Array.from({ length: 5 }).map((_, index) => ({
    dt: now + index * 86400,
    main: {
      temp: 293.15 + index,
      feels_like: 293.15 + index,
      pressure: 1013,
      humidity: 40,
      temp_min: 293.15 + index,
      temp_max: 294.15 + index
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d'
      }
    ],
    clouds: {
      all: 0
    },
    wind: {
      speed: 3.5,
      deg: 120
    },
    visibility: 10000,
    pop: 0,
    sys: {
      pod: 'd'
    },
    dt_txt: new Date((now + index * 86400) * 1000).toISOString().replace('T', ' ').slice(0, 19)
  }));

  return {
    cod: '200',
    message: 0,
    cnt: list.length,
    list,
    city: {
      id: 0,
      name: options.name || 'WeatherWhiz City',
      coord: {
        lat: options.lat || 0,
        lon: options.lon || 0
      },
      country: options.country || 'US',
      timezone: 0,
      sunrise: now - 3600,
      sunset: now + 3600
    }
  };
};

const requireOpenWeatherApiKey = (req, res) => {
  if (!process.env.OPENWEATHER_API_KEY) {
    return false;
  }
  return true;
};

const getWeatherResponse = async (url, fallback) => {
  if (!requireOpenWeatherApiKey()) {
    return fallback;
  }
  const response = await axios.get(url);
  return response.data;
};

// @desc    Get current weather by coordinates
// @route   GET /api/weather/current
// @access  Private
export const getCurrentWeather = asyncHandler(async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    res.status(400);
    throw new Error('Latitude and longitude are required');
  }

  try {
    const weatherData = await getWeatherResponse(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`,
      createPlaceholderWeather({ lat: Number(lat), lon: Number(lon) })
    );

    res.json(weatherData);
  } catch (error) {
    res.status(error.response?.status || 500);
    throw new Error(error.response?.data?.message || 'Error fetching weather data');
  }
});

// @desc    Get weather forecast by coordinates
// @route   GET /api/weather/forecast
// @access  Private
export const getWeatherForecast = asyncHandler(async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    res.status(400);
    throw new Error('Latitude and longitude are required');
  }

  try {
    const forecastData = await getWeatherResponse(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`,
      createPlaceholderForecast({ lat: Number(lat), lon: Number(lon) })
    );

    res.json(forecastData);
  } catch (error) {
    res.status(error.response?.status || 500);
    throw new Error(error.response?.data?.message || 'Error fetching forecast data');
  }
});

// @desc    Get current weather by city name
// @route   GET /api/weather/current/city
// @access  Private
export const getCurrentWeatherByCity = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q) {
    res.status(400);
    throw new Error('City name is required');
  }

  try {
    const weatherData = await getWeatherResponse(
      `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${process.env.OPENWEATHER_API_KEY}`,
      createPlaceholderWeather({ name: q })
    );

    res.json(weatherData);
  } catch (error) {
    res.status(error.response?.status || 500);
    throw new Error(error.response?.data?.message || 'Error fetching weather data');
  }
});

// @desc    Get weather forecast by city name
// @route   GET /api/weather/forecast/city
// @access  Private
export const getWeatherForecastByCity = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q) {
    res.status(400);
    throw new Error('City name is required');
  }

  try {
    const forecastData = await getWeatherResponse(
      `https://api.openweathermap.org/data/2.5/forecast?q=${q}&appid=${process.env.OPENWEATHER_API_KEY}`,
      createPlaceholderForecast({ name: q })
    );

    res.json(forecastData);
  } catch (error) {
    res.status(error.response?.status || 500);
    throw new Error(error.response?.data?.message || 'Error fetching forecast data');
  }
});
