const { getAllproducts, getSingleProduct, updateProduct, deleteProduct, createProduct } = require("../controller/productController")

const productRoute = require("express").Router()

productRoute.post("/", createProduct)
productRoute.get("/", getAllproducts)
productRoute.get("/:id", getSingleProduct)
productRoute.put("/:id", updateProduct)
productRoute.delete("/:id", deleteProduct)

module.exports = productRoute;