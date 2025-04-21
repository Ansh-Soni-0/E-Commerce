const { addToCart, updateCart, getUserCart } = require("../controllers/cartController")


const express = require("express")
const { authUser } = require("../middleware/auth")
const cartRouter = express.Router()

cartRouter.post('/add' , authUser , addToCart)
cartRouter.post('/update' , authUser , updateCart)
cartRouter.post('/get' , authUser , getUserCart)

module.exports = cartRouter