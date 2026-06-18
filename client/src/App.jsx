import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

// Context
import { AuthProvider, useAuth } from './context/AuthContext'
import { WeatherProvider } from './context/WeatherContext'

// Pages
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

// Components
import ProtectedRoute from './components/Auth/ProtectedRoute'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Loader from './components/UI/Loader'

// Root component wrapper for authentication context
const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const [appLoading, setAppLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle authentication state changes
  useEffect(() => {
    if (!loading) {
      console.log('Auth state updated:', { isAuthenticated, path: location.pathname });
      
      // If user is authenticated and on login/register page, redirect to dashboard
      if (isAuthenticated) {
        if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/') {
          console.log('Redirecting authenticated user to dashboard');
          navigate('/dashboard', { replace: true });
        }
      }
    }
  }, [isAuthenticated, loading, navigate, location.pathname]);

  if (appLoading || loading) {
    return <Loader />;
  }

  return (
    <WeatherProvider>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </WeatherProvider>
  );
};

// Main App component
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App
