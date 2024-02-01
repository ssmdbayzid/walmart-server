const { createOrder, getAllOrder, payment } = require("../controller/orderController");
const { authenticate, restrict } = require("../utls/verifyToken");

const orderRoute = require("express").Router()

// orderRoute.post("/", authenticate,  createOrder)
orderRoute.post("/",  createOrder)
orderRoute.get("/",  getAllOrder)
orderRoute.post("/payment",  payment)

module.exports = orderRoute;