import React, { useEffect, useState } from "react";
import axios from "axios";

function Table() {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const fetchAppointmetns = async () => {
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
        console.log("error : ", error.message);
      }
    };
    fetchAppointmetns();
  }, []);
  return (
    <div className="mt-5">
      <h4 className="mb-3">Recent Appointments</h4>

      <table className="table table-striped table-hover shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Patient Name</th>
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
      </table>
    </div>
  );
}

export default Table;
