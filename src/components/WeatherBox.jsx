import React from 'react'
import moment from 'moment'
import { useState, useRef, useEffect } from 'react'
import { IconImages } from '../Images'
import SearchBar from './SeachBar'
import Header from './Header'
import Lottie from 'lottie-react' // Importing Lottie for basic animation features
import lottieWeb from 'lottie-web' // Needed to access the lottie-web instance for advanced features
import { WeatherImages } from '../Images'

export default function WeatherBox() {
    const [data, setData] = useState({})
    const [locationDate, setLocationDate] = useState(null)
    const [currentWeather, setCurrentWeather] = useState(IconImages.defaultIcon)
    const humidityLottieRef = useRef(null) // Set the ref for the humidity animation
    const windLottieRef = useRef(null) // Set the ref for the wind animation

    // Render the animation for the humidity ref
    // This is a separate useEffect to handle the humidity animation
    useEffect(() => {
        let lottieInstance = null;
        if (data.main && data.main.humidity !== undefined) {
            const humidity = data.main.humidity;

            // Access the lottie-web instance for advanced features
            if (humidityLottieRef.current) {
                if (lottieInstance) {
                    lottieInstance.destroy();
                    lottieInstance = null; // Destroy the previous instance if it exists
                }

                humidityLottieRef.current.innerHTML = ''; // Clear the previous animation

                lottieInstance = lottieWeb.loadAnimation({
                    container: humidityLottieRef.current, // Humidity DOM element
                    renderer: 'svg',
                    loop: false,
                    autoplay: false,
                    animationData: IconImages.humidityIcon,
                });

                // When the animation is loaded, set the speed and play the animation segmennts
                lottieInstance.addEventListener('DOMLoaded', () => {
                    const totalFrames = lottieInstance.totalFrames / 1.65; // Get the total number of frames in the animation (Adjusted for deadspace)
                    console.log(totalFrames);

                    // Calculate the frame range based on humidity
                    const framesPerRange = totalFrames / 10; // Frames per 10% range
                    const startFrame = Math.floor((Math.floor(humidity / 10)) * framesPerRange);
                    const endFrame = Math.min(startFrame + framesPerRange, totalFrames);

                    console.log(`Start Frame: ${startFrame}, End Frame: ${endFrame}`);

                    lottieInstance.setSpeed(0.15); // Slow down the animation
                    let isFirstRun = true;
                    let isReversing = false;


                    lottieInstance.setSpeed(0.5); // Animation speed for first run
                    lottieInstance.playSegments([0, endFrame], true);


                    lottieInstance.addEventListener('complete', () => {
                        if (isFirstRun) {
                            // After the first run, reverse back to startFrame
                            lottieInstance.setSpeed(0.15); // Slow down for subsequent runs
                            lottieInstance.playSegments([endFrame, startFrame], true); // Play backward after first run
                            isFirstRun = false; // Mark first run as complete
                        } else {
                            // Alternate between forward and backward playback
                            if (!isReversing) {
                                lottieInstance.playSegments([startFrame, endFrame], true); // Start loop assuming forward first
                            } else {
                                lottieInstance.playSegments([endFrame, startFrame], true); // Play backward
                            }
                            isReversing = !isReversing; // Toggle the direction
                        }
                    });
                });
            }
        }
    }, [data.main?.humidity])


    // Render the animation for the wind ref
    // This is a separate useEffect to handle the wind animation
    useEffect(() => {
        let lottieInstanceWind = null;
        if (data.wind && data.wind.speed) {
            const windSpeed = data.wind.speed;
            if (windLottieRef.current) {
                if (lottieInstanceWind) {
                    lottieInstanceWind.destroy();
                    lottieInstanceWind = null;
                }

                windLottieRef.current.innerHTML = '';

                lottieInstanceWind = lottieWeb.loadAnimation({
                    container: windLottieRef.current, // Wind DOM element
                    renderer: 'svg',
                    loop: true,
                    autoplay: false,
                    animationData: IconImages.windIcon,
                })

                lottieInstanceWind.addEventListener('DOMLoaded', () => {
                    if (windSpeed < 1) {
                        lottieInstanceWind.setSpeed(0.05);
                        lottieInstanceWind.playSegments([0, 100], true);

                    } else if (windSpeed > 1 && windSpeed < 3) {
                        lottieInstanceWind.setSpeed(0.25);
                        lottieInstanceWind.playSegments([0, 100], true);
                    } else if (windSpeed > 3 && windSpeed < 8) {
                        lottieInstanceWind.setSpeed(0.5);
                        lottieInstanceWind.playSegments([0, 100], true);
                    }
                    else if (windSpeed > 8 && windSpeed < 15) {
                        lottieInstanceWind.setSpeed(1);
                        lottieInstanceWind.playSegments([0, 100], true);
                    } else if (windSpeed > 15 && windSpeed < 25) {
                        lottieInstanceWind.setSpeed(2);
                        lottieInstanceWind.playSegments([0, 100], true);
                    } else if (windSpeed > 25) {
                        lottieInstanceWind.setSpeed(3);
                        lottieInstanceWind.playSegments([0, 100], true);
                    }
                });
            }
        }
    }, [data.wind])

    useEffect(() => {
        if (data.dt && data.timezone !== undefined) {
            const initialUnixTime = data.dt + data.timezone; // Get the initial unix timestamp and timezone offset
            setLocationDate(initialUnixTime); // Set the initial unix time

            // Update the time every second
            const interval = setInterval(() => {
                setLocationDate((prevUnixTime) => prevUnixTime + 1);
            }, 1000);
            
            return () => clearInterval(interval); // Clear the interval on component unmount
        }
    }, [data.dt, data.timezone]);

    // Format the time for display
    const formattedTime = locationDate ? moment.unix(locationDate).utc().format('HH:mm:ss') : 'Loading...'; 

    return (
        <div className="h-auto w-10/12 bp:w-8/12 ap:w-4/12 p-4 bg-white rounded-3xl flex flex-col items-center">
            <Header />
            <SearchBar setData={setData} setCurrentWeather={setCurrentWeather} />
            {currentWeather === IconImages.defaultIcon ?
                <div className='flex items-center flex-col font-neonTilt text-slate-600 m-auto'>
                    <span className='w-40 md:w-40 bp:w-72 ap:w-48 UWQ:w-72 h-auto my-auto'>
                        <Lottie animationData={currentWeather} />
                    </span>
                    <p className='uppercase text-base md:text-2xl bp:text-4xl ap:text-xl UWQ:text-4xl text-center'>Use the searchbar to check your desired location</p>
                </div> :
                <>
                    <div className='flex items-center flex-col font-neonTilt text-slate-600 my-auto'>
                        <span className='justify-center text-center'>
                            <h3 className='text-2xl md:text-3xl bp:text-5xl ap:text-2xl UWQ:text-5xl'>{data.name}</h3>
                            <p>Currently the time in {data.name} is: <span className='text-violet-700'>{formattedTime}</span></p>
                        </span>
                        <div className="relative w-40 md:w-40 bp:w-72 ap:w-48 UWQ:w-72 h-auto">
                            {data.main ? (
                                <h3 className="absolute inset-0 flex items-center justify-center text-2xl md:text-4xl ap:text-2xl UWQ:text-4xl text-violet-700 z-10 opacity-85">
                                    {Math.round(data.main.temp)}°C
                                </h3>
                            ) : null}
                            <Lottie animationData={currentWeather} />
                        </div>
                        {data.weather ? <p className='uppercase text-md md:text-2xl ap:text-md'>{data.weather[0].description}</p> : null}
                    </div>
                    <div className='flex flex-row font-neonTilt text-violet-700 pb-4 items-center justify-evenly w-full m-auto'>
                        <div className='w-1/4 flex flex-col items-center align-center text-center'>
                            <div
                                ref={humidityLottieRef}
                                className="w-12 md:w-20 bp:w-24 ap:w-12 UWQ:w-24"
                            />
                            {data.main ? (
                                <p className='text-sm md:text-2xl ap:text-sm UWQ:text-2xl'>
                                    Humidity: {data.main.humidity}%
                                </p>
                            ) : null}
                        </div>
                        <div className='w-1/4 flex flex-col items-center align-center text-center'>
                            <div
                                ref={windLottieRef}
                                className='w-12 md:w-20 bp:w-24 ap:w-12 UWQ:w-24'
                            />
                            {data.wind ? (
                                <p className='text-sm md:text-2xl ap:text-sm UWQ:text-2xl'>
                                    Wind: {Math.round(data.wind.speed)} m/s
                                </p>
                            ) : null}
                        </div>
                    </div>
                </>}
        </div>
    )
}