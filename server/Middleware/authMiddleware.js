const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req,res,next) => {
 try {
    const token = req.header("auth-token");
     if(!token){
        return res.status(400).send("Token not found");
     }
     const decodedToken = jwt.verify(token ,JWT_SECRET );
     req.user = decodedToken;
     console.log("access given")
     next();
 } catch (error) {
    console.log("The error is ", error.message)
    return res.status(500).send("Internal Server Error")
 }
};

module.exports = authMiddleware;