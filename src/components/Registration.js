import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { FaUserPlus } from "react-icons/fa";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) return alert("Phone must be 10 digits");
    setLoading(true);
    try {
      await addDoc(collection(db, "users"), { name, email, phone });
      setName(""); setEmail(""); setPhone("");
      alert("Registration successful!");
    } catch (err) {
      console.error(err);
      alert("Error during registration");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ backgroundColor: "#98AFC7", minHeight: "100vh", paddingTop: "70px" }}>
      <div className="container mt-4">
        <h2 className="text-center mb-4 text-white">User Registration</h2>

        {loading && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-25"
            style={{ zIndex: 1055 }}
          >
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            ></div>
          </div>
        )}

        <form
          className="mx-auto bg-white p-4 rounded shadow"
          style={{ maxWidth: "400px" }}
          onSubmit={handleSubmit}
        >
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control mb-3"
            placeholder="Enter 10-digit phone"
            pattern="\d{10}"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2"
          >
            <FaUserPlus /> Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
