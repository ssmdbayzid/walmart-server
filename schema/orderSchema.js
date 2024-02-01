const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    tran_id: {
        type: String,
        trim: true,
        required: true,
    },
   
    email: {
        type: String,
        trim: true,
        required: true,
    },
    cartItems: {
        type: Array,
        required: true
    },
    shippingAddress: {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        mobile: {
            type: String,
            trim: true,
            required: true,
        },
        address: {
            type: String,
            trim: true,
            required: true,
        },
        town: {
            type: String,
            trim: true,
            required: true,
        },
        region: {
            type: String,
            trim: true,           
        },       
    },    
    total_price: {
        type: Number,
        trim: true,
        required: true,
    },
    status: {
        type: String,
        trim: true,
        required: true,
    }
});

module.exports = mongoose.model("Order", orderSchema);
