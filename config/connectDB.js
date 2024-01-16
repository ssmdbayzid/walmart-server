const mongoose = require('mongoose');

mongoose.set('strictQuery', false)

const connectDB  = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Mongodbb Database connected")
    } catch (error) {

        console.log(error.message, "MongoDB database is connection failed")
    }
}


module.exports = connectDB

// MONGO URL = mongodb+srv://walmart:eHHnoozXkgiDQ1BO@cluster0.gaysmtl.mongodb.net/?retryWrites=true&w=majority