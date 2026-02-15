import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.scss";

// Import page components
import Home from "./pages/Home";
import Donate from "./pages/Donate.tsx";
import PostEventLinksManchester from "./pages/PostEventLinks/PostEventLinksManchester.tsx";
import PostEventLinksLeeds from "./pages/PostEventLinks/PostEventLinksLeeds.tsx";
import Contact from "./pages/Contact.tsx";
import { ROUTES } from "./constants/routes";
import GalleryOverview from "./pages/gallery/GalleryOverview.tsx";
import { GalleryEvent } from "./pages/gallery/Gallery.tsx";

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMenu = () => {
    if (isNavOpen) {
      setIsNavOpen(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img className={"logo"} src={"/QIT-logo-1.jpg"} alt={"logo"} />
            <Link to={ROUTES.home} onClick={closeMenu}>
              Queer in Tech
            </Link>
          </div>

          <div
            className={`navbar-toggle ${isNavOpen ? "active" : ""}`}
            onClick={toggleNav}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

          <ul className={`navbar-menu ${isNavOpen ? "active" : ""}`}>
            <li className="navbar-item">
              <Link to={ROUTES.home} className="navbar-link" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className="navbar-item">
              <Link to={ROUTES.gallery} className="navbar-link" onClick={closeMenu}>
                Gallery
              </Link>
            </li>
            {/* New Contact link placed just before Donate */}
            <li className="navbar-item">
              <Link
                className="navbar-link"
                onClick={closeMenu}
                to={ROUTES.contact}
              >
                Contact
              </Link>
            </li>
            <li className="navbar-item donate">
              <Link
                className={"donate-text navbar-link"}
                onClick={closeMenu}
                to={ROUTES.donate}
              >
                Donate
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="content">
        <Routes>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.gallery} element={<GalleryOverview />} />
          <Route path={ROUTES.galleryEvent} element={<GalleryEvent />} />
          <Route path={ROUTES.contact} element={<Contact />} />
          <Route path={ROUTES.donate} element={<Donate />} />
          <Route path={ROUTES.linksLatest} element={<PostEventLinksManchester />} />
          <Route
            path={ROUTES.linksManchester}
            element={<PostEventLinksManchester />}
          />
          <Route path={ROUTES.linksLeeds} element={<PostEventLinksLeeds />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
