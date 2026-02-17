import { useState, useEffect } from "react";
import logo from "../assets/logo1.png";
import { Link, useNavigate } from "react-router-dom";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-title">
          <img src={logo} alt="BioRekha logo" className="navbar-logo" />
        </Link>
      </div>

      {/* Hamburger Icon */}
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Nav Links */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          {user ? (
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          ) : (
            <Link to="/vitals" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}
        </li>

        <li>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
        </li>

        <li>
          <Link to="/vitals" onClick={() => setMenuOpen(false)}>
            Vitals
          </Link>
        </li>

        <li>Share</li>
      </ul>
    </nav>
  );
}

export default Navbar;

