import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaUserPlus } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: { lat: null, lon: null }
  });
  const [validated, setValidated] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const { register, isAuthenticated, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (formData.password || formData.confirmPassword) {
      setPasswordMatch(formData.password === formData.confirmPassword);
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getLocation = () => {
    setLocationStatus('Getting location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            location: {
              lat: position.coords.latitude,
              lon: position.coords.longitude
            }
          });
          setLocationStatus('Location updated successfully!');
          setTimeout(() => setLocationStatus(''), 3000);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationStatus('Failed to get location. Please try again.');
          setTimeout(() => setLocationStatus(''), 3000);
        }
      );
    } else {
      setLocationStatus('Geolocation is not supported by your browser.');
      setTimeout(() => setLocationStatus(''), 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false || !passwordMatch) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setValidated(true);
    
    try {
      const success = await register(formData);
      if (success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <Container fluid className="auth-container">
      <Row className="justify-content-center w-100">
        <Col xs={12} md={11} lg={10} xl={9}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-100"
          >
            <Card className="auth-card">
              <Card.Body>
                <div className="text-center">
                  <h2 className="auth-title">Create an Account</h2>
                  <p className="auth-subtitle">Join WeatherWhiz for personalized lifestyle recommendations</p>
                </div>
                
                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}
                
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-4" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaUser />
                      </span>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="Choose a username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        minLength="3"
                      />
                      <Form.Control.Feedback type="invalid">
                        Username must be at least 3 characters.
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaEnvelope />
                      </span>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaLock />
                      </span>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                      />
                      <Form.Control.Feedback type="invalid">
                        Password must be at least 6 characters.
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaLock />
                      </span>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        isInvalid={validated && !passwordMatch}
                      />
                      <Form.Control.Feedback type="invalid">
                        Passwords do not match.
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Location</Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="text"
                        value={formData.location.lat ? `${formData.location.lat.toFixed(4)}, ${formData.location.lon.toFixed(4)}` : 'No location set'}
                        readOnly
                      />
                      <Button
                        variant="outline-primary"
                        onClick={getLocation}
                        className="location-button"
                      >
                        <FaMapMarkerAlt className="me-2" />
                        Update Location
                      </Button>
                    </div>
                    {locationStatus && (
                      <Form.Text className="text-muted">
                        {locationStatus}
                      </Form.Text>
                    )}
                  </Form.Group>

                  <div className="auth-button-container">
                    <Button
                      type="submit"
                      className="auth-button"
                      disabled={loading}
                    >
                      {loading ? (
                        <>Loading...</>
                      ) : (
                        <>
                          <FaUserPlus className="me-2" />
                          Create Account
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
                
                <div className="auth-links">
                  <p>
                    Already have an account?{' '}
                    <Link to="/login" className="auth-link">
                      Sign In
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
