import { createContext, useState, useEffect, useContext } from 'react';
import axios from '../utils/axiosConfig';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on page load
    const checkLoggedIn = async () => {
      setLoading(true);
      
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setUser(null);
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        
        // Set auth header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        try {
          // Get user data
          const res = await axios.get('/api/users/me');
          console.log('Profile loaded:', res.data);
          
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (profileErr) {
          console.error('Error fetching profile:', profileErr);
          const status = profileErr.response?.status;
          if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
          }
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Error checking authentication:', err);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  // Register user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Registering user with data:', userData);
      
      // Ensure location data is properly formatted as numbers
      if (userData.location) {
        userData.location = {
          lat: Number(userData.location.lat),
          lon: Number(userData.location.lon)
        };
      }
      
      const res = await axios.post('/api/users/register', userData);
      console.log('Registration response:', res.data);
      
      // Store token and set authorization header
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      // Set user state and authentication state
      setUser(res.data);
      setIsAuthenticated(true);
      toast.success('Registration successful!');
      
      // Return success
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again or ensure the backend is running.';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Logging in user with data:', { email: userData.email });
      
      const res = await axios.post('/api/users/login', userData);
      console.log('Login response:', res.data);
      
      // Store token and set authorization header
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      // Set user state and authentication state
      setUser(res.data);
      setIsAuthenticated(true);
      toast.success('Login successful!');
      
      return true;
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials or ensure the backend is running.';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
    toast.info('Logged out successfully');
  };

  // Update user location
  const updateLocation = async (location) => {
    try {
      // Ensure location data is properly formatted as numbers
      const formattedLocation = {
        lat: Number(location.lat),
        lon: Number(location.lon)
      };
      
      console.log('Updating user location:', formattedLocation);
      
      const res = await axios.put('/api/users/location', { location: formattedLocation });
      
      setUser(prevUser => ({
        ...prevUser,
        location: formattedLocation
      }));
      
      toast.success('Location updated successfully');
      return true;
    } catch (err) {
      console.error('Error updating location:', err);
      toast.error('Failed to update location');
      return false;
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const res = await axios.put('/api/users/me', profileData);
      setUser(res.data);
      return true;
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
      return false;
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    updateLocation,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
