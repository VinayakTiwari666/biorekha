import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom";

import Navbar from "./components/Navbar"
import AboutPage from "./components/Aboutpage"
import Vital from "./components/Vitals"
import "./App.css"
import logo from "./assets/logorework.png"

function App() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Intro screen
  if (showIntro) {
    return (
      <div className="intro">
        <img src={logo} alt="BioRekha logo" className="intro-logo" />
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <div className="main-page">
              <div className="content">
                <h1>
                  Welcome to <span className="highlight">BioRekha</span> – Your
                  Health Records Simplified
                </h1>

                <p>
                  Easily access and manage your health records with BioRekha.
                  Your health, your control.
                </p>

                <p className="trust-line">
                  🔒 Secure • 📁 Centralized • 👨‍⚕️ Patient-first
                </p>
                
                <Link to="/vitals">
                  <button className="get-started-btn">
                    Get Started
                   
                  </button>
                </Link>
              </div>
            </div>
          }
        />
      
        {/* ABOUT */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/vitals" element={<Vital />} />{/* VITALS */}
      </Routes>
      
    </>
  )
}

export default App

