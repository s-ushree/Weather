import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { WiDaySunny } from 'react-icons/wi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-content">
          <Col md={4} className="footer-brand mb-4 mb-md-0">
            <Link to="/" className="footer-logo">
              <WiDaySunny />
              <span>WeatherWhiz</span>
            </Link>
            <p className="footer-tagline">
              Your personalized weather lifestyle companion
            </p>
            <div className="footer-social">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaGithub />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaLinkedin />
              </a>
            </div>
          </Col>
          
          <Col md={2} sm={6} xs={6} className="footer-links">
            <h5>Navigation</h5>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </Col>
          
          <Col md={2} sm={6} xs={6} className="footer-links">
            <h5>Resources</h5>
            <ul>
              <li><a href="#">Weather API</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </Col>
          
          <Col md={4} className="footer-newsletter">
            <h5>About WeatherWhiz</h5>
            <p>
              WeatherWhiz provides personalized lifestyle recommendations based on current weather conditions, 
              including food, music, and fashion suggestions tailored to your location.
            </p>
          </Col>
        </Row>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} WeatherWhiz. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
