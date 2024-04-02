const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,                
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    photo:{
        type: String,
        trim: true,
    },
    role:{
        type: String,
        trim:true,
        enum:["user", "admin"],
        default: "user"
    },
    shippingAddress: {
        type: Object,
    },
    billingAddress: {
        type: Object,
    },
    orders: [{type: mongoose.Types.ObjectId, ref: "Order"}]
})

module.exports = mongoose.model("User", userSchema)
