const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT || 6000

app.use(express.json())

app.get("/", (req, res)=> {
    res.send("Server running")
})

app.listen(port, ()=>{
    console.log(`ecommerce web running ${port}`)
})