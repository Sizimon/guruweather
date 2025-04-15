import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { IconImages } from '../Images'
import SearchBar from './SeachBar'
import Lottie from 'lottie-react' // Importing Lottie for basic animation features
import lottieWeb from 'lottie-web' // Needed to access the lottie-web instance for advanced features
import { WeatherImages } from '../Images'

export default function WeatherBox() {
    const [data, setData] = useState({})
    const [currentWeather, setCurrentWeather] = useState(IconImages.defaultIcon)
    const humidityLottieRef = useRef(null) // Set the ref for the humidity animation

    // Render the animation for the set ref
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
                    const framesPerRange = totalFrames / 10; // Frames per 5% range
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

    return (
        <>
            <SearchBar setData={setData} setCurrentWeather={setCurrentWeather} />
            {currentWeather === IconImages.defaultIcon ?
                <div className='flex items-center flex-col font-neonTilt text-slate-600 m-auto gap-10'>
                    <span className='w-48 md:w-72 lg:w-48 h-auto'>
                        <Lottie animationData={currentWeather} />
                    </span>
                    <p className='uppercase md:text-2xl lg:text-lg'>Please Enter a Valid Location.</p>
                </div> :
                <>
                    <div className='flex items-center flex-col gap-6 font-neonTilt text-slate-600 m-auto'>
                        <span>
                            <h3 className='text-2xl md:text-4xl lg:text-2xl'>{data.name}</h3>
                        </span>
                        <span className='w-40 md:w-52 lg:w-40 rounded-full h-auto'>
                            <Lottie animationData={currentWeather} />
                        </span>
                        {data.weather ? <p className='uppercase text-md md:text-2xl lg:text-md'>{data.weather[0].description}</p> : null}
                    </div>
                    <div className='flex flex-col font-neonTilt text-violet-700 text-2xl m-auto'>
                        <span>
                            {data.main ? <h3 className='text-4xl md:text-6xl lg:text-4xl'>{Math.round(data.main.temp)}°C</h3> : null}
                        </span>
                    </div>
                    <div className='flex flex-row gap-6 font-neonTilt text-violet-700 pb-4 items-center justify-evenly w-full m-auto'>
                        <div className='w-1/4 flex flex-col items-center align-center text-center'>
                            <div
                                ref={humidityLottieRef}
                                className="w-12 md:w-20 lg:w-12"
                            />
                            {/* <Lottie 
                                lottieRef={humidityLottieRef}
                                animationData={IconImages.humidityIcon} 
                                className='w-12 md:w-20 lg:w-12'
                                loop={false}
                                autoplay={false} 
                            /> */}
                            {data.main ? (
                                <p className='text-sm md:text-2xl lg:text-sm'>
                                    Humidity: {data.main.humidity}%
                                </p>
                            ) : null}
                        </div>
                        <div className='w-1/4 flex flex-col items-center align-center text-center'>
                            <Lottie animationData={IconImages.windIcon} className='w-12 md:w-20 lg:w-12' />
                            {data.wind ? <p className='text-sm md:text-2xl lg:text-sm'>Wind: {data.wind.speed}m/s</p> : null}
                        </div>
                    </div>
                </>}
        </>
    )
}