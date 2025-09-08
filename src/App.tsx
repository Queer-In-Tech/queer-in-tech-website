import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

// Import page components
import Home from './pages/Home'
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
                        <img className={"logo"} src={"QIT-logo-1.jpg"} alt={"logo"}/>
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
                            <Link to="https://donate.stripe.com/00waEQ4AL0tHgxU72W0x200">Donate</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/gallery" className="navbar-link" onClick={closeMenu}>Gallery</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="content">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/gallery" element={<Gallery/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App
