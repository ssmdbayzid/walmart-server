const { createOrder,  payment, getSingleOrder, updateOrder, getAllOrders } = require("../controller/orderController");
const { authenticate, restrict } = require("../utls/verifyToken");

const orderRoute = require("express").Router()

// orderRoute.post("/", authenticate,  createOrder)
orderRoute.post("/",  createOrder)

orderRoute.get("/",  getAllOrders)
orderRoute.get("/:id",  getSingleOrder)
orderRoute.put("/:id",  updateOrder)

orderRoute.post("/payment",  payment)

module.exports = orderRoute;