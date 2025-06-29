import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import Generator from "./pages/Generator/Generator";
import Uploader from "./pages/Uploader/Uploader";
import History from "./pages/History/History";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
      </BrowserRouter>,
)
