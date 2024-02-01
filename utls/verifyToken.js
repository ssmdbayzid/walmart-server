const jwt = require("jsonwebtoken");


//------------ Verify Access Token 
exports.authenticate = async (req, res, next) =>{
    const authToken = req.headers.authorization;

    if(!authToken || !authToken.startsWith("Bearer ")){
        return res
        .status(401)
        .json({success: false, message: "No token, access denied"})
    }

    try {
        const token = authToken.split("Bearer ")[1]
        // verify token

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
        if(decoded.email){
            req.email = decoded.email
            next()
        }
    } catch (error) {
        if(error.name === "TokenExpiredError"){
            return res
            .status(401).json({success: false, message: "Token expired"})
        }
        return res
        .status(401).json({success: false, message: error.message})
    }
}

