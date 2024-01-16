const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    tran_id : {
        type: String,
        trum: true,
        required: true,
    },
    customer_name: {
        type: String,
        trim: true, 
        required: true,
    },
    customer_email: {
        type: String,
        trim: true,
        required: true,
    },
    customer_address: {
        type: String,
        trim: true,
        required: true,
    },
    customer_mobile: {
        type: Number,
        trim: true,
        required: true,
    },
    total_price: {
        type: Number,
        trum: true,
        required: true,
    },
    paid: {
        type: String,
        trim: true,
        required: true
    }
})

module.exports = mongoose.model("Order", orderSchema)