const mongoose = require("mongoose");
const {Schema} = mongoose;

const appointmentsSchema = new Schema({
    
 userId : {type : mongoose.Schema.Types.ObjectId , required : true , ref:"user"},
 dentistId : {type :  mongoose.Schema.Types.ObjectId , required : true , ref : "dentist"},
 serviceId : {type :  mongoose.Schema.Types.ObjectId , required : true , ref : "service"},
 date : {type : String , required : true },
 time : {type : String , required : true},
 status : {type : String , required : true , enum : ["pending" , "confirmed" , "canceled" , "completed"] , default : "pending"},
} , {timestamps : true}); 

const Appointments = mongoose.model("appointments" , appointmentsSchema);
module.exports = Appointments;