const { getUser, updateUser, allUsers } = require("../controller/userController")

const userRoute = require("express").Router()

userRoute.get("/", allUsers)

userRoute.get("/:id", getUser)
userRoute.put("/:id", updateUser)

module.exports =  userRoute