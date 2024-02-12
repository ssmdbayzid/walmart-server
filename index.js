const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT || 6000
const  cors = require("cors")
const body_parser = require("body-parser")
// const connectDB = require("./config/connectDB")
const productRoute = require("./Routes/productRoute")
const authRoute = require("./Routes/authRoute")
const orderRoute = require("./Routes/orderRoute")
const mongoose  = require("mongoose")
const userRoute = require("./Routes/userRoute")

const corsOptions ={
    origin:'https://walmart-272ed.web.app/', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
  }

    app.use(express.static("public"));
    app.use(express.json());
    app.use(cors(corsOptions))
    app.use(body_parser.json())

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connect database")
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
// https://walmart-server-gulv625pm-ssmd-bayzid.vercel.app/



app.listen(port, ()=>{
    console.log(`ecommerce web running ${port}`)
    // connectDB()
})