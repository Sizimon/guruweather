# **GuruWeather**

GuruWeather is a modern weather application built with React that provides real-time weather information for any location. It features a visually appealing interface with animations, dynamic backgrounds, and responsive design. The app uses the OpenWeatherMap API to fetch weather data and displays it in an intuitive and user-friendly way.

---

## **Features**

- **Search for Weather by Location**:
  - Enter a city name to get real-time weather data, including temperature, humidity, wind speed, and weather conditions.

- **Dynamic Animations**:
  - Weather animations (e.g., sunny, rainy, cloudy) are displayed based on the current weather conditions using Lottie animations.

- **Local Time Display**:
  - Displays the local time of the searched location, updated every second.

- **Responsive Design**:
  - Fully responsive layout that works seamlessly on mobile, tablet, and desktop devices.

- **Particle Background**:
  - A visually appealing particle background that enhances the user experience.

- **Night and Day Detection**:
  - Automatically adjusts animations and themes based on whether it is day or night in the searched location.

---

## **Technologies Used**

- **Frontend**:
  - React
  - Tailwind CSS for styling
  - Lottie for animations
  - tsparticles for the particle background

- **Backend**:
  - OpenWeatherMap API for weather data

- **Deployment**:
  - Dockerized for easy deployment
  - Serve for serving the React app

---

## **Project Structure**

react-weather-api/
├── public/                 # Static files
├── src/
│   ├── components/         # React components
│   │   ├── Header.jsx      # Header component
│   │   ├── SearchBar.jsx   # Search bar for location input
│   │   ├── WeatherBox.jsx  # Main weather display component
│   │   ├── ParticleBackground.jsx # Particle background
│   ├── assets/             # Lottie animation files
│   ├── Images.js           # Weather and icon mappings
│   ├── App.jsx             # Main app component
│   ├── App.css             # Global styles
├── Dockerfile              # Docker configuration
├── .env                    # Environment variables
├── [package.json]

---

## **Future Enhancements**

- Add support for hourly and weekly weather forecasts.
- Implement geolocation to automatically detect the user's location.
- Add more detailed weather metrics (e.g., UV index, air quality).
- Improve accessibility and add dark mode.

---

## **Getting Started**

### **Prerequisites**
- Node.js and npm installed
- Docker installed (optional for deployment)

### **Installation**
1. Clone the repository:
    git clone https://github.com/your-username/react-weather-api.git
    cd react-weather-api

2. Install dependencies:
    npm install

3. Create a .env file in the root directory and add your OpenWeatherMap API key:
    REACT_APP_WEATHER_API_KEY=your_api_key_here || Then replace "REACT_APP_WEATHER_API_KEY_PLACEHOLDER" on Line 16 in SearchBar.jsx with your environment variable.

4. Start the development server:
    npm start

## **Tributes**

- OpenWeatherMap API for providing weather data.
- Lottie for animations.
- tsparticles for the particle background.