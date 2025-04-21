const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");

//placing order using cod method

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod:"COD",
      payment:false,
      date:Date.now()
    };
    const newOrder = await orderModel.create(orderData)

    // after place the order the cart data has been cleared 
    await userModel.findByIdAndUpdate(userId,{cartData:{}})

    return res.json({success : true , message : "Order Placed"})

  } catch (error) {
    console.log(error);
    res.json({success : false , message : error.message})
    
  }
};

//placing order using strip method
const placeOrderStripe = async (req, res) => {
    
};

//placing order using razorpay method
const placeOrderRazorpay = async (req, res) => {};

//all orders data for admin panel
const allOrders = async (req, res) => {
  try {
    
    const orders = await orderModel.find({})
    res.json({success:true , orders})

  } catch (error) {
    console.log(error);
    res.json({success : false , message : error.message})
  }
};

//user Order data for frontend
const userOrders = async (req, res) => {
  try {
    
    const { userId } = req.body
    const orders = await orderModel.find({ userId })

    res.json({success:true , orders})

  } catch (error) {
    console.log(error);
    res.json({success : false , message : error.message})
  }
};

//update order status from admin panel
const updateStatus = async (req, res) => {
  try {
    
    const { orderId , status} = req.body
    await orderModel.findByIdAndUpdate(orderId , { status })
    return res.json({success : true , message : "Status Updated"})

  } catch (error) {
    console.log(error);
    res.json({success : false , message : error.message})
  }
};

module.exports = {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
