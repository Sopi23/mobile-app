
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (name.length < 3) {
      alert("Name must be at least 3 characters");
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }
    if (phone.length !== 10 || isNaN(phone)) {
      alert("Phone must be 10 digits");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "users"), {
        name,
        email,
        phone,
        timestamp: new Date()
      });

      setName('');
      setEmail('');
      setPhone('');
      setSuccess(true);
    } catch (err) {
      console.error("Error adding document: ", err);
      alert("Error submitting form. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter your name" />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="you@example.com"
            required  />
        </div>
        <div className="mb-3">
          <label>Phone</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder="Enter 10-digit phone"
            required />
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {success && (
        <div className="alert alert-success mt-3" role="alert">
          Registration successful!
        </div>
      )}
    </div>
  );
}

export default Registration;