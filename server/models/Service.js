const mongoose = require("mongoose");
const {Schema} = mongoose; 

const serviceSchema = new Schema({
 serviceName:{ type : String , required : true},
 price:{type : Number , required : true},
 duration:{type : String , required:true},
 description: {type : String , required : true}
});

const Service = mongoose.model("service" , serviceSchema);
module.exports = Service;