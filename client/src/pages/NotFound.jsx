import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { WiRain } from 'react-icons/wi';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <Container className="not-found-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="not-found-content"
      >
        <div className="not-found-icon">
          <WiRain />
        </div>
        
        <h1>404</h1>
        <h2>Page Not Found</h2>
        
        <p>
          Oops! The page you're looking for seems to have drifted away like a cloud.
        </p>
        
        <Button 
          as={Link} 
          to="/" 
          variant="primary" 
          size="lg"
          className="mt-4"
        >
          Return Home
        </Button>
      </motion.div>
    </Container>
  );
};

export default NotFound;
