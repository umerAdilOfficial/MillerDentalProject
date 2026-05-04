const jwt = require('jsonwebtoken'); 
const JWT_SECRET = process.env.JWT_SECRET;

const adminMiddleware = async(req ,res , next) => {
    try {

        // TAKING TOKEN FROM HEADER
    const token = req.header("auth-token");

    // IF TOKEN NOT FOUND THROW AN ERROR
    if(!token){
        return res.status(403).send("Access denied. No token provided.")
    }

    // TAKE TOKEN AND DECODE TO TAKE ROLE FROM IT 
    const decodedToken = jwt.verify(token , JWT_SECRET);
    req.user = decodedToken;

    // IF ROLE IS ADMIN GIVE ALL ACCESS ELSE RETURN
    if(decodedToken.role !== "admin"){
        return res.status(403).send("You Are Not An Admin")
    }else{
        console.log("Access Given");
        console.log(decodedToken.role);
        console.log(req.user)
        next();
    }
} catch (error) {
    console.log("the error is " , error.message)
    res.status(500).send("Internal Server Error")
}
}

module.exports = adminMiddleware;