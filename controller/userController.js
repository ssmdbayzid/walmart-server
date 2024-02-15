const  User  = require("../schema/userSchema");


// ---------- Get All User -------------

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

// ---------- Get User -------------

exports.getUser = async (req, res)=>{
    try {
        const id = req.params.id
        const user =  await User.findOne({_id: id}).populate("orders")
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

// ---------- Update User -------------
exports.updateUser = async (req, res)=>{
    try {
        const id = req.params.id;        
        const updateUser = await User.findByIdAndUpdate({_id: id}, req.body, { new: true })
        console.log(updateUser)
        
        return res
        .status(200).json({success: true, message: "User Updated Successfully", data:"updateUser"})
    } catch (error) {
        return res
        .status(500).json({success: false, message: error.message})
    }
}

exports.deleteUser = async (req, res)=>{
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id)
        console.log(id)
        return res
        .status(200).json({success: true, message: "Delete user sucessfully"})
    } catch (error) {
        return res
        .status(500).json({success: false, message: error.message})
    }
}