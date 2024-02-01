const { register, getToken, refreshToken } = require("../controller/authController")
const { verifyRefreshToken } = require("../utls/verifyRefreshToken")

const authRoute = require("express").Router()


authRoute.post("/jwt-token", getToken)
authRoute.get("/refresh-token", verifyRefreshToken, refreshToken)

module.exports = authRoute;