const Order = require("../schema/orderSchema");
const User = require("../schema/userSchema");

exports.createOrder = async (req, res)=>{
    
    const {productId} = req.params;
    console.log(req.email)

    // const newOrder = {...req.body, productId: productId}
    // console.log(newOrder)
    try {
        const newOrder = await Order.create({...req.body, productId: productId})
        if(newOrder._id){
            try {
                await User.updateOne({email : req.email}, {
                    $push: {
                        order: newOrder._id,
                    }
                })                
            } catch (error) {
                return res
                .status(500).json({success: false, message: error.message})                
            }
        }
        return res
        .status(200).json({success: true, message: "Order completed", id: newOrder._id})
    } catch (error) {
        return res
        .status(500).json({success: false, message: error.message})
    }
}

exports.getAllOrder = async (req, res)=>{
    try {
       const allOrder =  await Order.find()
    return res
    .status(200).json({success: true, message: "Get All Order Successfully", data: allOrder})
    } catch (error) {
        return res
        .status(200).json({success: false, message: error.message})
    }
}