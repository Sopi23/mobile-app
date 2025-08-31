import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Registration from "./components/Registration";
import About from "./components/About";
import UserList from "./components/UserList";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { db } from "./firebase";

console.log("Firestore initialized:", db);

function App() {
  const [navOpen, setNavOpen] = useState(false); // toggle state for mobile navbar

  const toggleNav = () => setNavOpen(!navOpen);

  return (
    <Router>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Mobile-App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNav}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${navOpen ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={() => setNavOpen(false)}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/registration" onClick={() => setNavOpen(false)}>
                  Registration
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users" onClick={() => setNavOpen(false)}>
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about" onClick={() => setNavOpen(false)}>
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
