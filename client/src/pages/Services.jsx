import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

function Services() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/services/getAllServices/",
          {
            headers: {
              "auth-token": token,
            },
          },
        );
        setServices(response.data);
      } catch (error) {
        console.log("error :", error);
        alert("error : ", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="d-flex">
      <div style={{ width: "25%" }}>
        <Sidebar />
      </div>
      <div className="p-5" style={{ width: "75%" }}>
        <h2 className="pb-3">Manage Services</h2>
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {services.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.serviceName}</td>
                <td>{item.price}</td>
                <td>{item.duration}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Link to="/addService">
            <button className="btn btn-primary me-md-2" type="button">
              Button
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Services;
