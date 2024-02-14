const jwt = require("jsonwebtoken")
const  User  = require("../schema/userSchema")

//-------------- Generate Access Token -----------------

const generateAccessToken = email => {    
    
    return jwt.sign({email: email}, process.env.ACCESS_TOKEN, {expiresIn: "1d"})    
}
//-------------- Generate Refresh Token -----------------
const generateRefreshToken = email => {    
    return jwt.sign({email: email}, process.env.REFRESH_TOKEN, {expiresIn: "7d"})    
}

exports.register = async (req, res) =>{
    try {
       await User.create(req.body)
       return res
       .status(200)
       .json({success: true, message: "Signup successfull"})

    } catch (error) {
        return res
        .status(500).json({success:false, message: error.message})
    }
}


exports.getToken = async (req, res)=>{    
    const {email} = req.body;    
    console.log(req.body)
    
    try {
        if(email){
            let user;
            const result =  await User.findOne({email: email})              
            console.log(result)
            const {orders, ...rest} = result._doc
            if(result.role == "admin"){
                user = rest
            }else{
                user = result
            }

            const accessToken = generateAccessToken(email)
            const refreshToken = generateRefreshToken(email)        
           return res
           .status(200)
           .json({success: true, message: "Successfully login", accessToken, refreshToken, user:user})
        }
    
    } catch (error) {
        console.log(error)
      return  res.status(500).json({message: error.message})        
    }
    
}

exports.refreshToken = async (req, res)=>{  
    const {email} = req.body;       
    const accessToken = generateAccessToken(email)
    return res
    .status(200).json({success: true, accessToken, data: "New  accesstoken generated"})    
}
