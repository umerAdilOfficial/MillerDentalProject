const mongoose = require("mongoose");
const {Schema} = mongoose;

const adminSchema = new Schema({
    email : {type : String , required : true},
    password : {type : String , required : true},
    role : {type : String , default:"admin"}
});

const Admin = mongoose.model("admin" , adminSchema);
module.exports = Admin