const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const adminMiddleware = require("../Middleware/adminMiddleware")

// ADDING SERVICE HERE (ONLY ADMIN)
router.post("/addService" ,adminMiddleware, async(req,res) => {
    try {
        const addService = await Service.create({
            serviceName : req.body.serviceName,
            price : req.body.price,
            duration : req.body.duration,
            description : req.body.description
        });
        res.status(200).json(addService);
    } catch (error) {
        console.log(error.message)
     res.status(500).send("Internal Server Error")   
    }
});

// GETTING ALL SERVICES 
router.get("/getAllServices" , async(req,res) => {
    try {
        const allServices = await Service.find({})
        res.status(200).json(allServices)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
});

// UPDATING SERVICE HERE (ADMIN ONLY )
router.put("/updateService/:serviceId" ,adminMiddleware, async(req,res) => {
  try {
    const {serviceId} = req.params;
    const {serviceName , price ,duration ,description} = req.body;
    const updatedService = await Service.findByIdAndUpdate(serviceId , {serviceName , price ,duration ,description} , {new : true , runValidators : true})
    if (!updatedService){
        return (res.status(400).send("service not found"))
    }
    res.status(200).json(updatedService)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error")
  }
});

// DELETING SERVICE FROM DATABASE HERE (ADMIN ONLY)
router.delete("/deleteService/:serviceId",adminMiddleware , async(req,res) => {
try {
    const {serviceId} = req.params;
    const deleteService = await Service.findByIdAndDelete(serviceId);
    if(!deleteService){
        return (res.status(400).send("service not found"))
    }
    res.status(200).json(deleteService)
} catch (error) {
    console.log("the error is" , error.message)
    res.status(500).send("Internal Server Error")
}
});

module.exports = router;