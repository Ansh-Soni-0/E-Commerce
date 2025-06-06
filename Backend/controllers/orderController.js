const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const Stripe = require("stripe")

//global variables
const currency = "inr"
const deliveryCharge = 10
// getway initialize
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(stripeSecretKey)

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
    try {
      const { userId, items, amount, address } = req.body;
      const { origin } = req.headers

      const orderData = {
        userId,
        items,
        amount,
        address,
        paymentMethod:"Stripe",
        payment:false,
        date:Date.now()
      };

      const newOrder = await orderModel.create(orderData)

      const line_items = items.map((item) => ({
        price_data: {
          currency:currency,
          product_data:{
            name:item.name
          },
          unit_amount:item.price * 100
        },
        quantity: item.quantity
      }))

      line_items.push({
        price_data: {
          currency:currency,
          product_data:{
            name:"Delivery Charges",
          },
          unit_amount:deliveryCharge * 100
        },
        quantity: 1
      })

      const session = await stripe.checkout.sessions.create({
        success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode:'payment',    
      })

      return res.json({success: true , session_url : session.url})

    } catch (error) {
      console.log(error);
      return res.json({success:false , message:error.message})
      
    }
};

//verify stripe
const verifyStripe = async (req , res) => {
  const { orderId , success , userId} = req.body

  try {
    
    if(success === "true"){
      await orderModel.findByIdAndUpdate(orderId , {payment:true});
      await userModel.findByIdAndUpdate(userId , {cartData: {}})
      return res.json({success:true});
    }  else {
      await orderModel.findByIdAndDelete(orderId)
      return res.json({success:false})
    }

  } catch (error) {
    console.log(error);
    return res.json({success:false , message:error.message})
  }
}

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
  verifyStripe
};
