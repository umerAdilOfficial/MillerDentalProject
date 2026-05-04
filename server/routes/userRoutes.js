require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken'); 
const adminMiddleware = require("../Middleware/adminMiddleware");
const authMiddleware = require("../Middleware/authMiddleware")

const JWT_Secret = process.env.JWT_SECRET;

 if(!process.env.JWT_SECRET){
            throw new Error("JWT Secret is not defined")
        }

router.post("/addUser" , async(req,res) => {
    try {
        if(!req.body.password || !req.body.email){
            return res.status(400).json({error:"Email and Password are required"});
        }
        if(req.body.password.length < 6){
            return res.status(400).json({error:"Password Must Be Atleast 6 Characters"});
        }
        const { password } = req.body;
        const email = req.body.email.toLowerCase();
        const user = await User.findOne({email});
        if(user){
           return res.status(400).json({error:"User already exists"});
            
        }
        const  salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(password , salt);
        const createUser = await User.create({
        name : req.body.name,
        email : email,
        password : securedPassword,
        role : "user",
        phoneNumber : req.body.phoneNumber
    });
const data = {
    id : createUser.id,
    role : createUser.role
}
const authToken = jwt.sign(data , JWT_Secret , {expiresIn : "1d"})

    res.status(200).json({success: true , token : authToken});
    } catch (error) {
        console.log("the error is" , error.message)
        res.status(500).send("Internal server error")
    }
});

router.post("/loginUser" , async(req,res) => {
try {
    if(!req.body.email || !req.body.password){
    return res.status(400).send("email and password is required");
}
    const { password} = req.body;
    const email = req.body.email.toLowerCase();
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).send("Invalid credentials");
    }
    const passwordCompare = await bcrypt.compare(password , user.password);
    if(!passwordCompare){
        return res.status(400).send("Invalid credentials");
    }
    const data = {
        id : user.id,
        role : user.role
    }

    const authToken = jwt.sign(data ,JWT_Secret , {expiresIn : "1d"});
    res.status(200).json({success : true , token : authToken});
} catch (error) {
    console.log("the error is" , error.message)
    res.status(500).send("Internal server error")
}
});

router.get("/getAllUser" ,adminMiddleware, async(req,res) => {
    try {
        const allUsers = await User.find({});
        res.status(200).json({message : "these are all users" , data : allUsers})
    } catch (error) {
        console.log("the error is ", error.message)
        return res.status(500).send("Internal Server Error")
    }
});

router.get("/getOneUser" ,authMiddleware, async(req,res) => {
    try {
        const userId = req.user.id;
        const oneUser = await User.findById(userId).select("-password")
        if(!oneUser){
            return res.status(400).send("User not found")
        }
        res.status(200).json(oneUser)
    } catch (error) {
        console.log("Error : " , error.message);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;