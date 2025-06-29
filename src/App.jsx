import { createContext, useState } from "react";
import "./App.css";
import Generator from "./pages/Generator/Generator";
import Uploader from "./pages/Uploader/Uploader";
import History from "./pages/History/History";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Uploader />} />
          <Route path="/uploader" element={<Uploader />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/history" element={<History />} />
        </Routes>
    </div>
  );
}

export default App;
