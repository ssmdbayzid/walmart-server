const Product = require("../schema/productSchema")

// --------------- Post Product -----------------
exports.createProduct = async (req, res)=>{
    try {
        const newProduct = new Product(req.body)
        newProduct.save()

        return res
        .status(200).json({success: true, message: "create product successfully", data: newProduct})
    } catch (error) {
        return res
        .status(500).json({success: false, message: error.message})
    }
}

//------------ Get All Products ---------------

exports.getAllproducts = async (req, res)=>{
    try {
        const data = await Product.find()        
        
        return res
        .status(200).json({success: true, data})

    } catch (error) {
        return res
        .status(500).json({success: false, message: error.message})
    }
}

// ---------------- Get Single Product ---------------

exports.getSingleProduct = async(req, res)=>{
    const id = req.params.id;
    console.log(id)
    try {
        const product = await Product.findById(id)

        return res
        .status(200).json({success: true, message: "Get data successfully", data: product})
        
    } catch (error) {
        return res
        .status(500).json({success: false, message: error.message})
    }
}

//----------------- Update Product ------------------

exports.updateProduct = async (req, res)=>{
    const id = req.params.id;
    console.log(id)
    console.log(req.body)
    try {
        // const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        //     new: true
        // })       

        // return res
        // .status(200).json({message: "Update data successfully", data: updatedProduct})
        return res.send(200)
    } catch (error) {
        return res
        .status(500).json({success: false, message: error.message })
    }
}

// ------------------ Delete Product ---------------

exports.deleteProduct = async (req, res)=>{
    const id = req.params.id;
    console.log("delete", id)
    try {
        const deleteProduct = await Product.findByIdAndDelete(id)

        return res
        .status(200).json({success: true, message: `Delete ${deleteProduct.title} successfully`})
    } catch (error) {
        return res
        .status(500).json({success: false, message: error.message})
    }
}