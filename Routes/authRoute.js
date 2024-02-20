const { register, getToken, refreshToken } = require("../controller/authController")
const { verifyRefreshToken } = require("../utls/verifyRefreshToken")

const authRoute = require("express").Router()

authRoute.post("/signup", register)
authRoute.post("/jwt-token", getToken)

module.exports = authRoute;