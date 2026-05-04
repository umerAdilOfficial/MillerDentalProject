import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Cards from "../components/Cards";
import axios from "axios";
import Table from "../components/Table";
import { Link } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState({});
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/admin/dashboard",
          {
            headers: {
              "auth-token": token,
            },
          },
        );
        setStats(response.data);
      } catch (error) {
        alert("error");
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="d-flex">
      <div className="sideBar" style={{ width: "25%" }}>
        <Sidebar />
      </div>
      <div className="container p-5 " style={{ width: "75%" }}>
        <div className="d-flex justify-content-between">
          <Cards title="Total Users" value={stats.totalUsers} />
          <Cards title="Total Appointments" value={stats.totalAppointments} />
          <Cards title="Total Dentists" value={stats.totalDentists} />
        </div>
        <div>
          <Table />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
