const  User  = require("../schema/userSchema");

exports.allUsers = async (req, res) =>{
    try {
       const users = await User.find().select("email role")
        return res
        .status(200).json({success: true, data: users})
    } catch (error) {
        return res
        .status(500).json({success: false, message:"something wents error"})
    }
}
exports.getUser = async (req, res)=>{
    try {
        const id = req.params.id
        const user =  await User.findOne({_id: id})
        .populate("orders")
        if(!user){
            return res.status(500).json({success: false, message: "Invalid credential"})
        }
        console.log(user)
        return res
        .status(200).json({message:"founded user", data: user})
    } catch (error) {
        return res
        .status(500).json({success: false, message: error.message})
    }
}

exports.updateUser = async (req, res)=>{
    try {
        const id = req.params.id;        
        const updateUser = await User.findByIdAndUpdate({_id: id}, req.body, { new: true })
        console.log(updateUser)
        return res
        .status(200).json({success: true, message: "User Updated", data:updateUser})
    } catch (error) {
        return res
        .status(500).json({success: false, message: error.message})
    }
}