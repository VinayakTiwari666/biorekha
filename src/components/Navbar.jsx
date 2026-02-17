import { useState } from "react"
import logo from "../assets/logo1.png"
import { Link } from "react-router-dom"




function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

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
        <li>Login</li>
         <li>
    <Link to="/about">About</Link>
  </li>
        <li>
    <Link to="/vitals">Vitals</Link>
  </li>
        
        <li>Share</li>
      </ul>
    </nav>
  )
}

export default Navbar
