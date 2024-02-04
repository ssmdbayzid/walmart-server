const { getUser, updateUser } = require("../controller/userController")

const userRoute = require("express").Router()

userRoute.get("/", getUser)
userRoute.put("/:id", updateUser)

module.exports =  userRoute