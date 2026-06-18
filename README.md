# WeatherWhiz - Weather Lifestyle Application

A responsive web application that provides lifestyle recommendations based on current weather conditions. The app offers personalized suggestions for food, music, and fashion tailored to the weather in your location.

## Features

- **User Authentication**: Secure login system with location tracking
- **Weather Widget**: Real-time weather information with forecast and wind speed
- **Food Recommendations**: Weather-appropriate food and recipe suggestions
- **Music Playlists**: Mood-based music recommendations that match the weather
- **Fashion Suggestions**: Stylish clothing recommendations for men and women based on weather conditions
- **Responsive Design**: Fully adaptive for both mobile and desktop devices

## Tech Stack

### Frontend
- React with Vite
- Bootstrap for responsive design
- Custom CSS animations and styling
- JSX for component structure

### Backend
- Node.js with Express
- MongoDB for data storage
- JWT for authentication

### APIs
- OpenWeather API for weather data
- Google APIs for additional functionality

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/WeatherWhiz.git
cd WeatherWhiz
```

2. Install dependencies for both client and server
```
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Create environment variables
   - Create `.env` file in the client directory with your API keys
   - Create `.env` file in the server directory with your MongoDB connection string

4. Start the development servers
```
# Start backend server
cd server
npm run dev

# In a new terminal, start frontend
cd client
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
WeatherWhiz/
├── client/                  # Frontend React application
│   ├── public/              # Static assets
│   ├── src/                 # Source files
│   └── ...                  # Configuration files
├── server/                  # Backend Node.js/Express application
│   ├── controllers/         # Route controllers
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   └── ...                  # Configuration files
└── ...                      # Root configuration files
```
