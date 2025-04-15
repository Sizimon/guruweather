import defaultWeather from './assets/default-weather.json';
import humidity from './assets/humidity.json';
import wind from './assets/wind.json';

import clouds from './assets/clouds.json';
import rain from './assets/rain.json';
import sun from './assets/sun.json';
import storm from './assets/storm.json';
import snow from './assets/snowy.json';
import fog from './assets/fog.json';
import sunClouds from './assets/sunny-with-clouds.json';
import nightTime from './assets/NightTime.json'

const WeatherImages = {
    sunny: sun,
    sunnyWithClouds: sunClouds,
    cloudy: clouds,
    rainy: rain,
    stormy: storm,
    snowy: snow,
    foggy: fog,
    night: nightTime
}

const IconImages = {
    defaultIcon: defaultWeather,
    humidityIcon: humidity,
    windIcon: wind,
}

export {WeatherImages, IconImages};