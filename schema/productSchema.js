const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    brand: {type: String, required: true},
    company: {type: String, required: true},
    color: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true}
});

module.exports = mongoose.model("Product", productSchema)