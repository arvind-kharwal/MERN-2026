import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
  try {
    const res = await axios.get("http://localhost:3002/users");
    console.log("Data: ", res.data);
    setUsers(res.data.userdata); // adjust to res.data.users if needed
  } catch (err) {
    console.error("Error", err);
  }
};


  return (
    <div>
      <center>
      <h1>List of Users</h1></center>
      <table class="table" border="1" cellPadding="5">
        <thead class="thead-dark">
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
              <tr key={u.id || index}>
                <td>{index + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
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
