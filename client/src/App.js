import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardSignup from "./pages/DashboardSignup";
import DashboardLogin from "./pages/DashboardLogin";
import Dashboard from "./pages/Dashboard";
import Dentists from "./pages/Dentists";
import Services from "./pages/Services";
import Users from "./pages/Users";
import Appointments from "./pages/Appointments";
import AddDentist from "./pages/AddDentist";
import AddService from "./pages/AddService";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DashboardLogin />} />
        <Route path="/signup" element={<DashboardSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dentists" element={<Dentists />} />
        <Route path="/services" element={<Services />} />
        <Route path="/users" element={<Users />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/addDentist" element={<AddDentist />} />
        <Route path="/addService" element={<AddService />} />
      </Routes>
    </div>
  );
}

export default App;
