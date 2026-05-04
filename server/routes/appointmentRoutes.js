const express = require("express");
const router = express.Router();
const Appointments = require("../models/Appointment");
const adminMiddleware = require("../Middleware/adminMiddleware");
const authMiddleware = require("../Middleware/authMiddleware");

// BOOK A NEW APPOINTMENT
router.post("/bookAppointment" ,authMiddleware, async (req,res) => {
try {
    const userId = req.user.id;
    const {date , time , serviceId , dentistId } = req.body;
    const bookAppointment = await Appointments.create({
        userId,
      date,
      time,
      serviceId,
      dentistId,
      status : "pending"
    });
    res.status(201).json({message : "Appointment Booked Succesfully" , data : bookAppointment});
} catch (error) {
    console.log("the error is"  , error.message)
    res.status(500).send("internal error occurs")
}
});

// GET APPOINTMENT OF USER 
router.get("/getUserAppoint" ,authMiddleware, async(req,res) => {
    try {
        const userId = req.user.id;
        const userAppoint = await Appointments.find({userId}).populate("serviceId" , "serviceName").populate("dentistId" , "name");
        if(!userAppoint){
            return (res.status(400).send("appointment not found"));
        }else{
            res.status(200).json(userAppoint);
        }
    } catch (error) {
        console.log("the error is", error.message)
     res.status(500).send("internal error occurs")   
    }
});

// GET ALL APPOINTMENT (ADMIN ONLY )
router.get("/getAllAppoint" ,adminMiddleware, async(req,res) => {
    try {
        const getAllAppoint = await Appointments.find({}).populate("dentistId" , "name").populate("userId" , "name").populate("serviceId" , "serviceName");
        res.status(200).json(getAllAppoint);
    } catch (error) {
        console.log("the error is" , error.message)
     res.status(500).send("internal error occurs")   
    }
});

// UPDATE STATUS OF APPOINTMENT (ADMIN ONLY)
router.put("/updateStatus/:appointId" ,adminMiddleware, async(req,res) => {
    try {
        const {appointId} = req.params;
        const {status} = req.body;
        const updatedAppoint = await Appointments.findByIdAndUpdate(appointId , {status:status} , {returnDocument : "after" , runValidators : true});
        if(!updatedAppoint){
            return (res.status(400).send("Appointment not found"))
        };
        res.status(200).json(updatedAppoint);
    } catch (error) {
        console.log("the error is" , error.message);
        res.status(500).send("some internal error occurs");
    }
});

module.exports = router;