const { getAllproducts, getSingleProduct, updateProduct, deleteProduct, createProduct } = require("../controller/productController")
const { authenticate, restrict } = require("../utls/verifyToken")

const productRoute = require("express").Router()

productRoute.post("/", createProduct)
productRoute.get("/", authenticate, getAllproducts)
productRoute.get("/:id", authenticate,  restrict(["user"]), getSingleProduct)
productRoute.put("/:id", authenticate, restrict(["user"]), updateProduct)
productRoute.delete("/:id", authenticate, restrict(["user"]), deleteProduct)

module.exports = productRoute;