import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import SharePage from "./components/SharePage";
import ShareQRCode from "./components/ShareQRCode";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Vitals from "./components/Vitals";
import AboutPage from "./components/Aboutpage";

import "./App.css";
import logo from "./assets/logorework.png";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [user, setUser] = useState(null);

  // Intro screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (showIntro) {
    return (
      <div className="intro">
        <img src={logo} alt="BioRekha logo" className="intro-logo" />
      </div>
    );
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
      <Route path="/share" element={<ShareQRCode />} />
<Route path="/share/:userId" element={<SharePage />} />

      {/* PROTECTED VITALS */}
<Route
  path="/vitals"
  element={
    user ? (
      <Vitals />
    ) : (
      <Login message="Please login to access Vitals." />
    )
  }
/>
    </Routes>
  </>
);

}

export default App;
