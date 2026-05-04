import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/appointments/getAllAppoint/",
          {
            headers: {
              "auth-token": token,
            },
          },
        );
        setAppointments(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("ERROR:", error.message);
      }
    };
    fetchAllAppointments();
  }, []);

  return (
    <div className="d-flex">
      <div style={{ width: "25%" }}>
        <Sidebar />
      </div>
      <div style={{ width: "75%" }} className="p-5">
        <h1 className="m-2 mb-5">Manage Appointments</h1>
        <table className="table table-striped table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Patient</th>
              <th>Dentist</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.userId.name}</td>
                <td>{item.dentistId.name}</td>
                <td>{item.serviceId.serviceName}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
          {/* <tbody>
            {appointments.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.userId.name}</td>
                <td>{item.dentistId.name}</td>
                <td>{item.serviceId.serviceName}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
    </div>
  );
}

export default Appointments;
