import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Registration from "./components/Registration";
import About from "./components/About";
import firebaseApp from "./firebase";

console.log("Firebase app initialized:", firebaseApp); 

function App() {
  return (
    <Router>
      {/* Navigation */}
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/" style={{ margin: "0 10px" }}>Home</Link>
        <Link to="/registration" style={{ margin: "0 10px" }}>Registration</Link>
        <Link to="/about" style={{ margin: "0 10px" }}>About</Link>
      </nav>

      {/* Screens */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
