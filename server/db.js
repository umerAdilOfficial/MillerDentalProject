require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connectToMongo = async() => {
    try {
       await mongoose.connect(MONGO_URI , console.log("mongo connected successfully "))
    } catch (error) {
        console.log("error is ",error.message)
    }
}

module.exports = connectToMongo;