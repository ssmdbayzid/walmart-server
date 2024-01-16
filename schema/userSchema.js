const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    role: {
        type: String,
        required: true, 
        enum: ["user", "admin"],
        default: "user"
    },
    order: [
        {
            type: mongoose.Types.ObjectId, ref: "Order"
        }
    ]
})

module.exports = mongoose.model("User", userSchema);