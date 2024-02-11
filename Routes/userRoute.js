const { getUser, updateUser, allUsers } = require("../controller/userController")

const userRoute = require("express").Router()

userRoute.get("/:id", getUser)
userRoute.get("/", allUsers)
userRoute.put("/:id", updateUser)

module.exports =  userRoute