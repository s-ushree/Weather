import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// Routes
import userRoutes from './routes/userRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';

// Load environment variables
dotenv.config({ path: './.env' });

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

if (!process.env.JWT_SECRET) {
  console.warn('JWT_SECRET is not set. Using a default development secret.');
  process.env.JWT_SECRET = 'weatherwhiz_dev_secret';
}

if (!process.env.OPENWEATHER_API_KEY) {
  console.warn('OPENWEATHER_API_KEY is not set. Weather routes will return placeholder data when called.');
}

console.log('Loaded env:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URI: Boolean(process.env.MONGO_URI),
  OPENWEATHER_API_KEY: Boolean(process.env.OPENWEATHER_API_KEY),
  JWT_SECRET: Boolean(process.env.JWT_SECRET)
});

const app = express();

// Middleware
app.use(cors({
  origin: true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Logging in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/users', userRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/recommendations', recommendationRoutes);

// API status route
app.get('/api/status', (req, res) => {
  res.json({ message: 'API is running' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  const PORT = process.env.PORT || 8000;

  try {
    await connectDB();

    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Change PORT or stop the conflicting process.`);
      } else {
        console.error('Server error:', err);
      }
    });
  } catch (err) {
    console.error('Failed to start server because MongoDB connection failed.');
    process.exit(1);
  }
};

startServer();
