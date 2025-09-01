import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

// Import page components
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Events from './pages/Events.tsx'
import Gallery from './pages/Gallery'

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  // Close mobile menu when a link is clicked
  const closeMenu = () => {
    if (isNavOpen) {
      setIsNavOpen(false)
    }
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img className={"logo"} src={"QIT-logo.jpg"} alt={"logo"}/>
            <Link to="/" onClick={closeMenu}>Queer in Tech</Link>
          </div>

          <div className={`navbar-toggle ${isNavOpen ? 'active' : ''}`} onClick={toggleNav}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

          <ul className={`navbar-menu ${isNavOpen ? 'active' : ''}`}>
            <li className="navbar-item">
              <Link to="/" className="navbar-link" onClick={closeMenu}>Home</Link>
            </li>
            <li className="navbar-item">
              <Link to="/about-us" className="navbar-link" onClick={closeMenu}>About Us</Link>
            </li>
            <li className="navbar-item">
              <Link to="/events" className="navbar-link" onClick={closeMenu}>Events</Link>
            </li>
            <li className="navbar-item">
              <Link to="/gallery" className="navbar-link" onClick={closeMenu}>Gallery</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </>
  )
}

export default App
