import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Registration from "./components/Registration";
import About from "./components/About";
import UserList from "./components/UserList";
import { db } from "./firebase"; 


console.log("Firestore initialized:", db);

function App() {
  return (
    <Router>
    
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/" style={{ margin: "0 10px" }}>Home</Link>
        <Link to="/registration" style={{ margin: "0 10px" }}>Registration</Link>
        <Link to="/about" style={{ margin: "0 10px" }}>About</Link>
        <Link to="/users" style={{ margin: "0 10px" }}>Users</Link>

      </nav>

  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration db={db} />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;
