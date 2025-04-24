import Header from './components/Header'
import React from 'react'
import './App.css'
import ParticleBackground from './components/ParticleBackground'
import WeatherBox from './components/WeatherBox'

function App() {
  return (
    <section className='h-screen flex flex-col items-center justify-center'>
        <WeatherBox />
      <ParticleBackground />
    </section>
  )
}

export default App
