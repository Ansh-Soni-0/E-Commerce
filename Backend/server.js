const express = require("express")
const cors = require("cors")
require("dotenv").config()
const { connectToMongoDb } = require('./config/mongodb')
const { connectClodinary } = require("./config/cloudinary")
const userRouter = require("./routes/userRoute")
const productRouter = require("./routes/productRoute")
const cartRouter = require("./routes/cartRoute")
const orderRouter = require("./routes/orderRoute")

// app config
const app = express()
const PORT = process.env.PORT || 4000

connectToMongoDb();
connectClodinary();

// middleware
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

// api endpoints

app.use('/api/user' , userRouter)
app.use('/api/product' , productRouter)
app.use('/api/cart' , cartRouter)
app.use('/api/order' , orderRouter)

app.get('/' ,  (req , res) => {
    res.send("API WORKING")
})


app.listen(PORT , () => console.log(`server started at port : ${PORT}`))