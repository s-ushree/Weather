import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI?.trim();

    const connect = async (connectionString) => {
      const conn = await mongoose.connect(connectionString, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4,
        appName: 'WeatherWhiz'
      });
      return conn;
    };

    if (uri) {
      try {
        const conn = await connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
      } catch (error) {
        console.warn(`MongoDB connection failed for configured URI. Falling back to in-memory database. Error: ${error.message}`);
      }
    } else {
      console.warn('MONGO_URI not provided. Starting in-memory MongoDB for development.');
    }

    mongoServer = await MongoMemoryServer.create();
    const memoryUri = mongoServer.getUri();
    const conn = await connect(memoryUri);
    console.log('MongoDB In-Memory Connected');
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    throw error;
  }
};
