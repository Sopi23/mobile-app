import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); 

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      console.log("Firestore querySnapshot size:", querySnapshot.size);

      const userData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log("Fetched users:", userData);
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchUsers();
}, []);

  const sortBy = (key) => {
    const newOrder = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(newOrder);

    const sorted = [...users].sort((a, b) => {
      const valA = a[key]?.toLowerCase?.() || "";
      const valB = b[key]?.toLowerCase?.() || "";

      if (valA < valB) return newOrder === "asc" ? -1 : 1;
      if (valA > valB) return newOrder === "asc" ? 1 : -1;
      return 0;
    });

    setUsers(sorted);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Registered Users</h2>

      <input
        type="text"
        placeholder="Search by name"
        className="form-control mb-3"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th onClick={() => sortBy("name")} style={{ cursor: 'pointer' }}>
              Name {sortKey === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => sortBy("email")} style={{ cursor: 'pointer' }}>
              Email {sortKey === "email" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => sortBy("phone")} style={{ cursor: 'pointer' }}>
              Phone {sortKey === "phone" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row">
        {filteredUsers.map(user => (
          <div className="col-md-4" key={user.id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">Email: {user.email}</p>
                <p className="card-text">Phone: {user.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
