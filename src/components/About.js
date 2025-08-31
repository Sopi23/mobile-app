import React from 'react';

function About() {
  return (
    <div style={{ backgroundColor: "#98AFC7", minHeight: "100vh", paddingTop: "70px" }}>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "700px", borderRadius: "15px" }}>
          <h2 className="text-center mb-3 text-primary">About Mobile-App</h2>
          <p className="text-muted">
            Welcome to <strong>Mobile-App</strong> 🎉  
            This project showcases how to build a modern, mobile-friendly application using <strong>React</strong> and <strong>Firebase</strong>.
          </p>
          <p className="text-muted">
            ✨ Features of this app include:
          </p>
          <ul className="text-muted">
            <li>📱 Mobile-first, responsive UI with Bootstrap</li>
            <li>🔥 Firebase Firestore integration for data storage</li>
            <li>📝 Simple user registration & user management</li>
            <li>🚀 Smooth navigation across pages</li>
          </ul>
          <p className="fw-bold text-center text-success">
            Designed for learning and demonstrating real-world app development!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
