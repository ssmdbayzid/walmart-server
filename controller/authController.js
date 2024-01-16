const { findOne } = require("../schema/productSchema");
const User = require("../schema/userSchema");
const jwt = require("jsonwebtoken")


//-------------- Generate Access Token -----------------

const generateAccessToken = email => {    
    
    return jwt.sign({email:email.email}, process.env.ACCESS_TOKEN, {expiresIn: "24h"})    
}
//-------------- Generate Refresh Token -----------------
const generateRefreshToken =email => {    
    return jwt.sign({email:email}, process.env.REFRESH_TOKEN, {expiresIn: "10s"})    
}



exports.register = async (req, res)=>{
    const {email} = req.body;
    console.log(email)
    try {
        await User.create({email: email})
        return res
        .status(200).json({success: true, message: "Sign Up Successfully"})
    } catch (error) {
        return res
        .status(200).json({success: false, message: error.message})
    }
}

exports.getToken = async (req, res)=>{    
    const {email} = req.body;    
    console.log(req.body)
    try {
        const user = await User.findOne({email: email})
        // compare password         
        console.log(user)
        if(!user){
            return res.status(400).json({message: "User or password invalid"})
        }
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)        
    

       return res
       .status(200)
       .json({success: true, message: "Successfully login", accessToken, refreshToken})
    } catch (error) {
        console.log(error)
      return  res.status(500).json({message: error.message})        
    }
    
}

exports.refreshToken = async (req, res)=>{  
    const {email} = req.body;   
    const bearer = req.headers.authorization    
    const accessToken = generateAccessToken(email)
    return res
    .status(200).json({success: true, accessToken, messag: "New  accesstoken generated"})    
}
