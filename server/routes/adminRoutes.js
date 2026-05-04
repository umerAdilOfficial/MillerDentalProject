const express = require("express");
const router = express.Router();
const Dentist = require("../models/Dentist");
const Service = require("../models/Service");
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const adminMiddleware = require("../Middleware/adminMiddleware");
const Admin = require("../models/Admin");
const jwt  = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcryptjs");



router.get("/dashboard" ,adminMiddleware, async(req,res)=> {
    try {
        
        const totalDentists = await Dentist.countDocuments();
        const totalServices = await Service.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalAppointments = await Appointment.countDocuments();
        res.status(200).json({ totalUsers , totalAppointments , totalDentists , totalServices} )

    } catch (error) {
        console.log("The error is" , error.message)
        return res.status(400).send("Internal Server Error");
    }
});

router.post("/adminLogin" , async(req,res) => {
try {
   const password = req.body.password;
    const email = req.body.email.toLowerCase();
    if(!email || !password){
        return res.status(400).json({
            error : "Email and password are required"
        });
    }

    const admin = await Admin.findOne({email});

    if(!admin){return res.status(400).json({error:"Admin does not exist"})}

    if(password !== admin.password){return res.status(400).json({error:"please enter correct password"})}

    const data =  {
    id : admin.id,
    role : admin.role
    }
    
    const token = jwt.sign(data , JWT_SECRET , {expiresIn : "1d"});
    res.status(200).json({success : true , token : token})

} catch (error) {
    console.log("error:" , error.message)
    res.status(500).json({error : "Internal server error"})
}
});


module.exports = router;