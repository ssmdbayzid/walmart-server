const  User  = require("../schema/userSchema");

exports.getUser = async (req, res)=>{
    try {
        const email = req.body.email;
        const user =  await User.findOne({email: email})
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