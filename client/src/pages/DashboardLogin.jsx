import axios from 'axios';
import  {useState} from 'react';
import { useNavigate } from 'react-router-dom';


function DashboardLogin() {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleLogin = async () => {
    try {
        if(!email || !password){
          console.log(error.response?.data?.error)
            alert( "please enter email and password");
            return 
        }
        const loginData = await axios.post("http://localhost:5000/api/admin/adminLogin", {
            email,
            password,
        });

        // STORING TOKEN IN LOCAL STORAGE FOR VERIFICATION
        localStorage.setItem("token" , loginData.data.token);

        // REDIRECTING USER TO DASHBOARD (GIVEN ACCESS)
        navigate("/dashboard")
    } catch (error) {
        console.log("Error: " , error.response?.data?.error)
        alert('Login Failed')
    }};
  return (
    <div className='w-100 vh-100 d-flex align-items-center justify-content-center flex-column'>
    <div className='m-3'>Login Page</div>
    
    <div className="form-floating mb-3"style={{width:"40%"}}>
  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="floatingInput" required placeholder="name@example.com"/>
  <label htmlFor="floatingInput">Email address</label>
</div>
<div className="form-floating" style={{width:"40%"}}>
  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="floatingPassword" required placeholder="Password"/>
  <label htmlFor="floatingPassword">Password</label>
</div>
<div className='mt-3 d-flex justify-content-end align-items-end' style={{width:"40%"}}>
    <button type="button" onClick={handleLogin} className="btn btn-outline-primary w-100 d-flex justify-content-center align-items-end">Login</button>
</div> 
    </div>
  )};

export default DashboardLogin;