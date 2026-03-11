import { useState, useEffect } from "react";
import logo from "../assets/logo1.png";
import { Link, useNavigate } from "react-router-dom";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

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

      {/* Hamburger Button */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link
            to="/about"
            className="nav-item"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
        </li>

        <li>
          <Link
            to="/vitals"
            className="nav-item"
            onClick={() => setMenuOpen(false)}
          >
            Vitals
          </Link>
        </li>

        <li>
          <Link
            to="/share"
            className="nav-item"
            onClick={() => setMenuOpen(false)}
          >
            Share
          </Link>
        </li>

        {!user && (
          <li>
            <Link
              to="/vitals"
              className="nav-item"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </li>
        )}

        {user && (
          <>
            <li>
              <span className="username">👥 {user.displayName}</span>
            </li>

            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;