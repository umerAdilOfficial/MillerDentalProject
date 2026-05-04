import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function DashboardSignup() {
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [phoneNumber , setPhoneNumber] = useState("");
    const [password , setPassword] = useState("");
    
    const navigate = useNavigate();

const handleSignUp = async () => {
    try {
        if (!email || !name || !phoneNumber || !password){
            alert("all fields are required")
            return
        }

        const signupData = await axios.post("http://localhost:5000/api/users/addUser" , {
            email , phoneNumber , password , name ,
        });

        localStorage.setItem("token" , signupData.data.token)
        navigate("/dashboard")
    } catch (error) {
        console.log(error.message )
        alert(error.response?.data?.error || "signup fails")
    }
}

  return (
     <div className='w-100 vh-100 d-flex align-items-center justify-content-center flex-column'>
    <div className='m-3'>SignUp Page</div>
    <div className='d-flex justify-content-between' style={{width:"40%"}}>
        <div className="form-floating mb-3"style={{width:"48%"}}>
  <input type="text" className="form-control" id="floatingInput" required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
  <label htmlFor="floatingInput">Name</label>
</div>
<div className="form-floating mb-3"style={{width:"48%"}}>
  <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-control" id="floatingInput" required placeholder="Phone Number"/>
  <label htmlFor="floatingInput">Phone Number</label>
</div>
    </div>
    <div className="form-floating mb-3"style={{width:"40%"}}>
  <input type="email" value={email} onChange={(e) => setEmail(e.target.value) } className="form-control" id="floatingInput" required placeholder="name@example.com"/>
  <label htmlFor="floatingInput">Email address</label>
</div>
<div className="form-floating" style={{width:"40%"}}>
  <input type="password" value={password} onChange={ (e) => setPassword(e.target.value)} className="form-control" id="floatingPassword" required placeholder="Password"/>
  <label htmlFor="floatingPassword">Password</label>
</div>
<div className='mt-3 d-flex justify-content-end align-items-end' style={{width:"40%"}}>
    <button type="button" onClick={handleSignUp} className="btn btn-outline-primary w-100 d-flex justify-content-center align-items-end">SignUp</button>
</div>
    </div>
  )
}

export default DashboardSignup