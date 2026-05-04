import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/users/getAllUser",
          {
            headers: {
              "auth-token": token,
            },
          },
        );
        setUsers(response.data.data);
      } catch (error) {
        console.log("error", error.message);
        alert("Internal server error");
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="d-flex">
      <div style={{ width: "25%" }}>
        <Sidebar />
      </div>
      <div style={{ width: "75%" }} className="p-5">
        <table className="table table-stripe table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
