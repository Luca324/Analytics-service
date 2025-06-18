import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Generator from './pages/Generator/Generator'
import Header from './components/header/Header'
function App() {

  return (
    <div className="App">
      <Header></Header>
      <Generator></Generator>
    </div>
  )
}

export default App
