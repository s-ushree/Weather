import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from '../UI/Loader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  // Show loader while checking authentication
  if (loading) {
    return <Loader />;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    console.log('Not authenticated, redirecting to login from:', location.pathname);
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // User is authenticated, render the protected content
  console.log('User authenticated, rendering protected route:', location.pathname);
  return children;
};

export default ProtectedRoute;
