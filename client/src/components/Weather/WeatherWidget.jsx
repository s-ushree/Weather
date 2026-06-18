import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiWindy } from 'react-icons/wi';
import { useWeather } from '../../context/WeatherContext';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const { weatherData, forecast, loading, getWeatherByCity } = useWeather();
  const [city, setCity] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const handleCitySearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    
    setSearchLoading(true);
    await getWeatherByCity(city);
    setSearchLoading(false);
  };

  // Get weather icon based on condition
  const getWeatherIcon = (condition) => {
    const iconSize = 50;
    condition = condition.toLowerCase();
    
    if (condition.includes('clear') || condition.includes('sun')) {
      return <WiDaySunny size={iconSize} />;
    } else if (condition.includes('rain')) {
      return <WiRain size={iconSize} />;
    } else if (condition.includes('cloud')) {
      return <WiCloudy size={iconSize} />;
    } else if (condition.includes('snow')) {
      return <WiSnow size={iconSize} />;
    } else if (condition.includes('thunder') || condition.includes('storm')) {
      return <WiThunderstorm size={iconSize} />;
    } else {
      return <WiCloudy size={iconSize} />;
    }
  };

  // Convert temperature from Kelvin to Celsius
  const kelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  if (loading) {
    return (
      <Card className="dashboard-card weather-widget-card">
        <Card.Header className="dashboard-card-header">
          <h4 className="dashboard-card-title">Weather</h4>
        </Card.Header>
        <Card.Body className="dashboard-card-body text-center">
          <div className="weather-loading">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Fetching weather data...</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="dashboard-card weather-widget-card">
      <Card.Header className="dashboard-card-header">
        <h4 className="dashboard-card-title">Weather</h4>
      </Card.Header>
      <Card.Body className="dashboard-card-body">
        <Form onSubmit={handleCitySearch} className="mb-3">
          <div className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="me-2"
            />
            <Button 
              type="submit" 
              variant="primary"
              disabled={searchLoading}
            >
              {searchLoading ? '...' : 'Search'}
            </Button>
          </div>
        </Form>

        {weatherData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="weather-content"
          >
            <div className="weather-main">
              <div className="weather-icon">
                {getWeatherIcon(weatherData.weather[0].main)}
              </div>
              <div className="weather-info">
                <h2 className="weather-temp">{kelvinToCelsius(weatherData.main.temp)}°C</h2>
                <p className="weather-condition">{weatherData.weather[0].main}</p>
                <p className="weather-location">{weatherData.name}, {weatherData.sys.country}</p>
              </div>
            </div>

            <div className="weather-details">
              <div className="weather-detail-item">
                <WiWindy size={25} />
                <div>
                  <span className="detail-value">{Math.round(weatherData.wind.speed)} m/s</span>
                  <span className="detail-label">Wind</span>
                </div>
              </div>
              <div className="weather-detail-item">
                <span className="detail-value">{weatherData.main.humidity}%</span>
                <span className="detail-label">Humidity</span>
              </div>
              <div className="weather-detail-item">
                <span className="detail-value">{kelvinToCelsius(weatherData.main.feels_like)}°C</span>
                <span className="detail-label">Feels like</span>
              </div>
            </div>

            {forecast && (
              <div className="weather-forecast">
                <h5>Forecast</h5>
                <div className="forecast-items">
                  {forecast.list.slice(0, 5).map((item, index) => (
                    <div key={index} className="forecast-item">
                      <div className="forecast-day">
                        {new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="forecast-icon">
                        {getWeatherIcon(item.weather[0].main)}
                      </div>
                      <div className="forecast-temp">
                        {kelvinToCelsius(item.main.temp)}°C
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {!weatherData && (
          <div className="text-center p-4">
            <p>No weather data available. Please search for a city.</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default WeatherWidget;
