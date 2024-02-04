const { createOrder, getAllOrder, payment, getSingleOrder, updateOrder } = require("../controller/orderController");
const { authenticate, restrict } = require("../utls/verifyToken");

const orderRoute = require("express").Router()

// orderRoute.post("/", authenticate,  createOrder)
orderRoute.post("/", authenticate, createOrder)
orderRoute.get("/",  getAllOrder)
orderRoute.get("/:id",  getSingleOrder)
orderRoute.put("/:id",  updateOrder)

orderRoute.post("/payment",  payment)

module.exports = orderRoute;