import { useState } from 'react'
import './App.css'
import Generator from './pages/Generator/Generator'
import Uploader from './pages/Uploader/Uploader'
import History from './pages/History/History'
import Header from './components/header/Header'
function App() {

  return (
    <div className="App">
      <Header></Header>
      <Uploader></Uploader>
      {/* <Generator></Generator> */}
      {/* <History></History> */}
    </div>
  )
}

export default App
