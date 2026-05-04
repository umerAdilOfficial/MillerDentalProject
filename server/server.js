const connectToMongo = require("./db")
const express = require("express");
const cors = require("cors")

const app = express();
const port = 5000;

connectToMongo();


app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))

app.use(express.json());

// AVAILABLE ROUTES
app.use("/api/dentists" , require("./routes/dentistRoutes"));
app.use("/api/services" , require("./routes/serviceRoutes"));
app.use("/api/appointments" , require("./routes/appointmentRoutes"));
app.use("/api/users" , require("./routes/userRoutes"));
app.use("/api/admin" , require("./routes/adminRoutes"));

app.listen(port , () => {
    console.log("app is listening on port" ,port);
});