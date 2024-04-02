const { register, getToken, refreshToken, googleLogin } = require("../controller/authController")
const { verifyRefreshToken } = require("../utls/verifyRefreshToken")

const authRoute = require("express").Router()

authRoute.post("/signup", register)
authRoute.post("/google/login", googleLogin)
authRoute.post("/jwt-token", getToken)

module.exports = authRoute;