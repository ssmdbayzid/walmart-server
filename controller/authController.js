const jwt = require("jsonwebtoken")
const  User  = require("../schema/userSchema")

//-------------- Generate Access Token -----------------

const generateAccessToken = email => {    
    
    return jwt.sign({email: email}, process.env.ACCESS_TOKEN, {expiresIn: "2d"})    
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
           return res
           .status(200)
           .json({success: true, message: "Successfully login", accessToken,  user:user})
        }
    
    } catch (error) {
        console.log(error)
      return  res.status(500).json({message: error.message})        
    }
    
}

exports.googleLogin = async (req, res) =>{
    try {
               
        const  user  = await User.findOne({email:req.body.email})
        if(user){
           const accessToken = generateAccessToken(req.body.email)      
           console.log("g user", user)
           return res
           .status(200)
           .json({success: true, message: "Successfully login", accessToken,  user:user})
        }else{
            const newUser = await User.create(req.body);
            const accessToken = generateAccessToken(req.body.email)      
           console.log("g signup", user)

            return res
            .status(200)
            .json({success: true, message: "Successfully login", accessToken,  user:newUser})
        }
    } catch (error) {
        return res
        .status(200).json({success: false, message: error.message})
    }
}
