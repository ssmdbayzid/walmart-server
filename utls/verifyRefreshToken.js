const jwt = require("jsonwebtoken")
exports.verifyRefreshToken = async (req, res, next) =>{
    const authToken = req.headers.authorization;

    console.log(authToken)
    if(!authToken || !authToken.startsWith("Bearer ")){
        return res
        .status(401).json({message: "Refresh token user unauthorized"})
    }
    try {
        const refreshToken = authToken.split(" ")[1];
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

        if(!decoded){
            return res
            .status(401).json({message: "Invalid Refresh Token"})
        }
        req.email = decoded.email;
        next()    
    } catch (error) {
        if(error.name === "TokenExpiredError"){
            return res
            .status(401).json({success: false, message: "Token expired"})
        }
        return res
        .status(500).json({success: false, message: error.message})
    }
}