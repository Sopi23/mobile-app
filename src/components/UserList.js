import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);

  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [addingUser, setAddingUser] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

 
  const sortBy = (key) => {
    const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(order);
    const sorted = [...users].sort((a, b) => {
      const valA = a[key]?.toString().toLowerCase() || "";
      const valB = b[key]?.toString().toLowerCase() || "";
      if (valA < valB) return order === "asc" ? -1 : 1;
      if (valA > valB) return order === "asc" ? 1 : -1;
      return 0;
    });
    setUsers(sorted);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

 
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(newPhone)) return alert("Phone must be 10 digits");
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: newName, email: newEmail, phone: newPhone,
      });
      setUsers([...users, { id: docRef.id, name: newName, email: newEmail, phone: newPhone }]);
      setAddingUser(false);
      setNewName(""); setNewEmail(""); setNewPhone("");
      alert("User added successfully!");
    } catch (err) {
      console.error(err); alert("Error adding user");
    } finally { setLoading(false); }
  };

 
  const handleEdit = (user) => { setEditingUser(user); setName(user.name); setEmail(user.email); setPhone(user.phone); };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) return alert("Phone must be 10 digits");
    if (!editingUser) return;
    setLoading(true);
    try {
      const userRef = doc(db, "users", editingUser.id);
      await updateDoc(userRef, { name, email, phone });
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, name, email, phone } : u));
      setEditingUser(null); setName(""); setEmail(""); setPhone("");
      alert("User updated successfully!");
    } catch (err) { console.error(err); alert("Error updating user"); }
    finally { setLoading(false); }
  };

  
  const handleDelete = async () => {
    if (!deletingUser) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, "users", deletingUser.id));
      setUsers(users.filter(u => u.id !== deletingUser.id));
      setDeletingUser(null);
      alert("User deleted successfully!");
    } catch (err) { console.error(err); alert("Error deleting user"); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ backgroundColor: "#98AFC7", minHeight: "100vh", paddingTop: "70px" }}>
      <div className="container mt-3">
        <h2 className="mb-4 text-center text-white">Registered Users</h2>

        {loading && <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-25" style={{ zIndex: 1055 }}>
          <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}></div>
        </div>}

        <div className="d-flex flex-wrap justify-content-between gap-2 mb-3">
          <button className="btn btn-success d-flex align-items-center gap-1" onClick={() => setAddingUser(true)}>
            <FaUserPlus /> Add User
          </button>
          <input type="text" placeholder="Search by name" className="form-control w-auto" style={{ minWidth: "200px" }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        
        <div className="table-responsive shadow-sm bg-white rounded p-2">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th onClick={() => sortBy("name")} style={{ cursor: "pointer" }}>Name {sortKey === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
                <th onClick={() => sortBy("email")} style={{ cursor: "pointer" }}>Email {sortKey === "email" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
                <th onClick={() => sortBy("phone")} style={{ cursor: "pointer" }}>Phone {sortKey === "phone" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2 mb-1 d-flex align-items-center gap-1" onClick={() => handleEdit(user)}><FaEdit /> Edit</button>
                    <button className="btn btn-danger btn-sm mb-1 d-flex align-items-center gap-1" onClick={() => setDeletingUser(user)}><FaTrash /> Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="row mt-4">
          {filteredUsers.map(user => (
            <div key={user.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{user.name}</h5>
                    <p className="mb-1"><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                  </div>
                  <div className="d-flex gap-2 mt-2">
                    <button className="btn btn-primary btn-sm flex-fill d-flex align-items-center justify-content-center gap-1" onClick={() => handleEdit(user)}><FaEdit /> Edit</button>
                    <button className="btn btn-danger btn-sm flex-fill d-flex align-items-center justify-content-center gap-1" onClick={() => setDeletingUser(user)}><FaTrash /> Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

    
        {addingUser && <Modal title="Add User" onClose={() => setAddingUser(false)}>
          <UserForm name={newName} email={newEmail} phone={newPhone} setName={setNewName} setEmail={setNewEmail} setPhone={setNewPhone} onSubmit={handleAddUser} submitText="Add" />
        </Modal>}
        {editingUser && <Modal title="Edit User" onClose={() => setEditingUser(null)}>
          <UserForm name={name} email={email} phone={phone} setName={setName} setEmail={setEmail} setPhone={setPhone} onSubmit={handleUpdate} submitText="Update" />
        </Modal>}
        {deletingUser && <Modal title="Confirm Delete" onClose={() => setDeletingUser(null)}>
          <p>Are you sure you want to delete <strong>{deletingUser.name}</strong>?</p>
          <div className="text-end mt-3">
            <button className="btn btn-secondary me-2" onClick={() => setDeletingUser(null)}>Cancel</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </Modal>}
      </div>
    </div>
  );
}


const Modal = ({ title, children, onClose }) => (
  <div className="modal show d-block" tabIndex="-1">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  </div>
);


const UserForm = ({ name, email, phone, setName, setEmail, setPhone, onSubmit, submitText }) => (
  <form onSubmit={onSubmit}>
    <label className="form-label">Full Name</label>
    <input type="text" className="form-control mb-2" placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} required />
    <label className="form-label">Email</label>
    <input type="email" className="form-control mb-2" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    <label className="form-label">Phone</label>
    <input type="tel" className="form-control mb-2" placeholder="Enter 10-digit phone" pattern="\d{10}" value={phone} onChange={(e) => setPhone(e.target.value)} required />
    <div className="text-end mt-2"><button type="submit" className="btn btn-success">{submitText}</button></div>
  </form>
);

export default UserList;
