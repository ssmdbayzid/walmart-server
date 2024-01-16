const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    role: {
        type: String,
        required: true, 
        enum: ["user", "admin"],
        default: "user"
    },
    billing_address: {
        address: {
            type: String,
            trim: true,
            required: true,
        },
        post_office: {
            type: String,
            trim: true,
            required: true,
        },
        police_station: {
            type: String,
            trim: true,
            required: true,
        },
        district: {
            type: String,
            trim: true,
            required: true,
        },
        mobile_no: {
            type: Number,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
        },
    },    
    order: [
        {
            type: mongoose.Types.ObjectId, ref: "Order"
        }
    ]
})

module.exports = mongoose.model("User", userSchema);