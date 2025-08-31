import React from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaUsers } from "react-icons/fa";

function Home() {
  return (
    <div style={{ backgroundColor: "#98AFC7", minHeight: "100vh", paddingTop: "70px" }}>
      <div className="container text-center d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <h1 className="mb-4 text-primary">Welcome to Mobile App</h1>
        <p className="mb-5 text-muted">
          Easily register users and manage the list in one place.
        </p>

        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
          <Link
            to="/registration"
            className="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2"
          >
            <FaUserPlus /> Registration
          </Link>
          <Link
            to="/users"
            className="btn btn-secondary btn-lg d-flex align-items-center justify-content-center gap-2"
          >
            <FaUsers /> User List
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
