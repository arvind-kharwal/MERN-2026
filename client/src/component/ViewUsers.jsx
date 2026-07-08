import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await axios.get("http://localhost:3002/users");
      setUsers(res.data.userdata);
    } catch (err) {
      console.error("Error", err);
    }
  };

  // Handle Edit
  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({ name: user.name, email: user.email });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3002/user/${editingUser}`, formData);
      setEditingUser(null);
      setFormData({ name: "", email: "" });
      loadUser();
    } catch (err) {
      console.error("Error updating user", err);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/user/${id}`);
      loadUser();
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  // Add new user
  const handleNewChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:3002/create", newUser);
      setNewUser({ name: "", email: "" }); // reset form
      loadUser(); // reload list
    } catch (err) {
      console.error("Error adding user", err);
    }
  };

  return (
    <div className="container">
      <center><h1>List of Users</h1></center>

      {/* Add User Form */}
      <div className="mb-3">
        <h4>Add New User</h4>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={newUser.name}
          onChange={handleNewChange}
          className="form-control mb-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={newUser.email}
          onChange={handleNewChange}
          className="form-control mb-2"
        />
        <button className="btn btn-primary" onClick={handleAdd}>Add User</button>
      </div>

      {/* User Table */}
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>S. No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u, index) => (
              <tr key={u.id}>
                <td>{index + 1}</td>
                <td>
                  {editingUser === u.id ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  ) : (
                    u.name
                  )}
                </td>
                <td>
                  {editingUser === u.id ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  ) : (
                    u.email
                  )}
                </td>
                <td>
                  {editingUser === u.id ? (
                    <>
                      <button className="btn btn-success btn-sm" onClick={handleSave}>Save</button>{" "}
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditingUser(null)}>Cancel</button>
                    </>
                  ) : (
                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(u)}>Edit</button>
                  )}
                  {" "}
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No User Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;
