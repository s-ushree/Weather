import { useState, useEffect } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button, Dropdown, Toast } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WiDaySunny } from 'react-icons/wi';
import { FaUser, FaSignOutAlt, FaMapMarkerAlt, FaHome } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout, updateLocation } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Close navbar when route changes
  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    showNotification('Logged out successfully');
  };

  const handleUpdateLocation = () => {
    if (navigator.geolocation) {
      showNotification('Updating your location...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: Number(position.coords.latitude),
            lon: Number(position.coords.longitude)
          };
          updateLocation(location);
          showNotification('Location updated successfully!');
        },
        (error) => {
          console.error('Error getting location:', error);
          showNotification('Failed to get location. Please try again.');
        }
      );
    } else {
      showNotification('Geolocation is not supported by your browser');
    }
  };

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  return (
    <>
      <BootstrapNavbar 
        expand="md" 
        className="navbar-main" 
        expanded={expanded}
        onToggle={setExpanded}
        fixed="top"
      >
        <Container>
          <BootstrapNavbar.Brand as={Link} to={isAuthenticated ? '/dashboard' : '/'} className="navbar-brand">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="brand-icon"
            >
              <WiDaySunny />
            </motion.div>
            WeatherWhiz
          </BootstrapNavbar.Brand>
          
          <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
          
          <BootstrapNavbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              {isAuthenticated ? (
                <>
                  <Nav.Link as={Link} to="/dashboard" className="nav-link d-flex align-items-center">
                    <FaHome className="me-1" /> Dashboard
                  </Nav.Link>
                  
                  <Button 
                    variant="outline-primary" 
                    className="location-btn mx-2"
                    onClick={handleUpdateLocation}
                  >
                    <FaMapMarkerAlt /> Update Location
                  </Button>
                  
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="link" className="nav-user-dropdown">
                      <div className="user-avatar">
                        <FaUser />
                      </div>
                      <span className="d-none d-md-inline">{user?.username || 'User'}</span>
                    </Dropdown.Toggle>
                    
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/dashboard">Dashboard</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>
                        <FaSignOutAlt className="me-2" /> Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register" className="nav-link">Register</Nav.Link>
                </>
              )}
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>

      {/* Add spacing to prevent content from hiding behind fixed navbar */}
      <div className="navbar-spacer"></div>
      
      {/* Toast notification */}
      <Toast 
        show={showToast} 
        onClose={() => setShowToast(false)} 
        delay={3000} 
        autohide
        style={{
          position: 'fixed',
          top: 70,
          right: 20,
          zIndex: 9999
        }}
      >
        <Toast.Header>
          <strong className="me-auto">WeatherWhiz</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
};

export default Navbar;
