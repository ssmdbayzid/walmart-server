const jwt = require("jsonwebtoken");
const User = require("../schema/userSchema");

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

// Restric 

exports.restrict = roles => async (req, res, next) =>{
    const email = req.email;
    const user = await User.findOne({email})    
    if(!roles.includes(user.role)){
        console.log("This is from restrict unauthorized")
    return res
    .status(401).json({success: false, message: "User Unauthorized"})
    }
    next()
}