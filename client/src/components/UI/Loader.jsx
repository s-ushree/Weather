import { motion } from 'framer-motion';
import { WiDaySunny } from 'react-icons/wi';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
          className="loader-icon"
        >
          <WiDaySunny />
        </motion.div>
        <motion.h3
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="loader-text"
        >
          Loading WeatherWhiz...
        </motion.h3>
      </div>
    </div>
  );
};

export default Loader;
