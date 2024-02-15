const { getUser, updateUser, allUsers, deleteUser } = require("../controller/userController")

const userRoute = require("express").Router()

userRoute.get("/", allUsers)

userRoute.get("/:id", getUser)
userRoute.put("/:id", updateUser)
userRoute.delete("/:id", deleteUser)

module.exports =  userRoute