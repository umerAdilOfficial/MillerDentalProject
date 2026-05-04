import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import Form from "../components/Form";
import { Link } from "react-router-dom";

function Dentists() {
  const [dentists, setDentists] = useState([]);
  useEffect(() => {
    const fetchDentist = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/dentists/getAllDentist/",
          {
            headers: {
              "auth-token": token,
            },
          },
        );
        setDentists(response.data);
      } catch (error) {
        console.log("error : ", error);
        alert("Error");
      }
    };
    fetchDentist();
  }, []);

  return (
    <div className="d-flex">
      <div style={{ width: "25%" }}>
        <Sidebar />
      </div>
      <div style={{ width: "75%" }} className="p-5">
        <h2 className="pb-3">Manage Dentists</h2>

        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Experience</th>
              <th>Speciality</th>
              <th>Available Days</th>
              <th>Available Time</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {dentists.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.experience}</td>
                <td>{item.speciality}</td>
                <td>{item.availableDays}</td>
                <td>{item.availableTime}</td>
                <td>{item.image}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-end">
          <Link to="/addDentist">
            <button className="btn btn-primary">Add Dentist</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dentists;
