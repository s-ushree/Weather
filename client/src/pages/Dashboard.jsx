import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useWeather } from '../context/WeatherContext';
import WeatherWidget from '../components/Weather/WeatherWidget';
import FoodRecommendations from '../components/Food/FoodRecommendations';
import MusicRecommendations from '../components/Music/MusicRecommendations';
import FashionRecommendations from '../components/Fashion/FashionRecommendations';
import Loader from '../components/UI/Loader';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { weatherData, loading, theme, getRecommendations } = useWeather();
  const [recommendations, setRecommendations] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    console.log('Dashboard mounted, user:', user);
    console.log('Weather data:', weatherData);
    console.log('Weather loading state:', loading);
    
    // Simulate page loading for smooth transitions
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [user, weatherData, loading]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (weatherData) {
        console.log('Fetching recommendations for weather:', weatherData.weather[0].main);
        try {
          const data = await getRecommendations();
          console.log('Recommendations received:', data);
          if (data) {
            setRecommendations(data);
          } else {
            console.warn('No recommendations data received from API');
          }
        } catch (error) {
          console.error('Error fetching recommendations:', error);
        }
      }
    };

    fetchRecommendations();
  }, [weatherData, getRecommendations]);

  // Show loader with a fallback message if loading takes too long
  if (pageLoading || loading) {
    return (
      <div className="dashboard-loading">
        <Loader />
        <p className="text-center mt-3">
          {loading ? "Fetching your weather data..." : "Preparing your dashboard..."}
        </p>
      </div>
    );
  }

  // Handle case where weather data failed to load
  if (!weatherData) {
    return (
      <Container className="text-center py-5">
        <h2>Unable to load weather data</h2>
        <p>We couldn't retrieve weather information for your location. Please try again later.</p>
      </Container>
    );
  }

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className={`dashboard-container theme-${theme}`}>
      <Container>
        <div className="dashboard-welcome">
          <h1>Hello, {user?.username || 'User'}!</h1>
          <p>Here are your personalized weather-based recommendations</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Row className="dashboard-content">
            <Col lg={4} md={6} className="mb-4">
              <motion.div variants={itemVariants}>
                <WeatherWidget />
              </motion.div>
            </Col>

            <Col lg={8} md={6} className="mb-4">
              <motion.div variants={itemVariants}>
                <FashionRecommendations recommendations={recommendations?.fashion} />
              </motion.div>
            </Col>

            <Col lg={6} md={6} className="mb-4">
              <motion.div variants={itemVariants}>
                <FoodRecommendations recommendations={recommendations?.food} />
              </motion.div>
            </Col>

            <Col lg={6} md={6} className="mb-4">
              <motion.div variants={itemVariants}>
                <MusicRecommendations recommendations={recommendations?.music} />
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </div>
  );
};

export default Dashboard;
