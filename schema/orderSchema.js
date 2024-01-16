const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    tran_id: {
        type: String,
        trim: true,
        required: true,
    },
    productId: {
        type: String,
        trim: true,
        required: true,
    },
    customer_name: {
        type: String,
        trim: true,
        required: true,
    },
    shipping_address: {
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
    },    
    total_price: {
        type: Number,
        trim: true,
        required: true,
    },
    paid: {
        type: String,
        trim: true,
        required: true,
    }
});

module.exports = mongoose.model("Order", orderSchema);
