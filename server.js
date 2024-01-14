const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT || 6000
const  cors = require("cors")
const body_parser = require("body-parser")
const connectDB = require("./config/connectDB")
const productRoute = require("./Routes/productRoute")

app.use(express.json())
app.use(cors())
app.use(body_parser.json())




app.get("/", (req, res)=> {
    res.send("Server running")
})


// -------------- Router  -------------
app.use("/api/v1/products/", productRoute)


app.listen(port, ()=>{
    console.log(`ecommerce web running ${port}`)
    connectDB()
})