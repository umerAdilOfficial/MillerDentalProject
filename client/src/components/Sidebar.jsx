import React from 'react';
import { Link } from 'react-router-dom';


function Sidebar() {
  const style = {
    color : "white",
    textDecoration : "none"
  }
  return (
    <div style={{width : "20%"}}>
      <div className="offcanvas offcanvas-start show text-bg-dark" style={{width : "25%"}} tabIndex="-1" id="offcanvasDark" aria-labelledby="offcanvasDarkLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasDarkLabel">Offcanvas</h5>
    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvasDark" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body mt-5 d-flex flex-column">
    <Link style={style} to="/dashboard"><p>Dashboard </p></Link>
    <Link style={style} to="/dentists"><p>Manage Dentists</p></Link>
    <Link style={style} to="/services" ><p>Manage Services </p></Link>
    <Link style={style} to="/appointments"><p>Manage Appointments</p></Link>
    <Link style={style} to="/users"><p>View Users </p></Link>

  </div>
</div>
    </div>
  )
}

export default Sidebar