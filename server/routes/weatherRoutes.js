import express from 'express';
import { 
  getCurrentWeather, 
  getWeatherForecast,
  getCurrentWeatherByCity,
  getWeatherForecastByCity
} from '../controllers/weatherController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.get('/current', protect, getCurrentWeather);
router.get('/forecast', protect, getWeatherForecast);
router.get('/current/city', protect, getCurrentWeatherByCity);
router.get('/forecast/city', protect, getWeatherForecastByCity);

export default router;
