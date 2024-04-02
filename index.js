const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()

const  cors = require("cors")
const body_parser = require("body-parser")
// const connectDB = require("./config/connectDB")
const productRoute = require("./Routes/productRoute")
const authRoute = require("./Routes/authRoute")
const orderRoute = require("./Routes/orderRoute")
const mongoose  = require("mongoose")
const userRoute = require("./Routes/userRoute")

const corsOptions = {
    origin: "https://walmart-272ed.web.app",
    // origin: "http://localhost:5173",
    credentials: true,
    optionSuccessStatus: 200

  };
    app.use(express.static("public"));
    app.use(express.json());
    app.use(cors(corsOptions))
    app.use(body_parser.json())

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
    } catch (error) {
        console.log(error.message, "mongodb database conn failed")
    }
}
connectDatabase().catch(err=> console.log(err.message))


app.get("/", (req, res)=> {
    res.send("Server running")
})


// -------------- Router  -------------
app.use("/api/v1/products/", productRoute)
app.use("/api/v1/auth/", authRoute)
app.use("/api/v1/users/", userRoute)
app.use("/api/v1/orders/", orderRoute)

//----------- Server Project ---------------
// https://walmart-server.vercel.app/

console.log(process.env.ACCESS_TOKEN)

app.listen(5000, ()=>{
    console.log(`ecommerce web running`)
    // connectDB()
})