const { getAllproducts, getSingleProduct, updateProduct, deleteProduct, createProduct } = require("../controller/productController")
const { authenticate, restrict } = require("../utls/verifyToken")

const productRoute = require("express").Router()

productRoute.post("/", createProduct)
productRoute.get("/", getAllproducts)
productRoute.get("/:id",  getSingleProduct)
productRoute.put("/:id", authenticate, updateProduct)

productRoute.delete("/:id", authenticate, deleteProduct)
// productRoute.delete("/:id", authenticate, deleteProduct)

module.exports = productRoute;