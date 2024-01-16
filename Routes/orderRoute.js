const { createOrder, getAllOrder } = require("../controller/orderController");
const { authenticate, restrict } = require("../utls/verifyToken");

const orderRoute = require("express").Router()

orderRoute.post("/:productId", authenticate, restrict(["user"]), createOrder)
orderRoute.get("/", authenticate, restrict(["user"]), getAllOrder)

module.exports = orderRoute;