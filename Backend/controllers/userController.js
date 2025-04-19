const  userModel  = require('../models/userModel')
const validator = require("validator")
const bcript = require("bcrypt")
const { createToken } = require("../utils/generateToken")
const jwt= require("jsonwebtoken")

// user login route
const loginUser = async (req , res) => {

    try {

        const {email , password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(200).json({success:false , message:"user doesn't exist"})
        }

        const isMatch = await bcript.compare(password , user.password)

        if(!isMatch){
            return res.json({success:false , message : "Invalid credantials"})
        }

        const token = createToken(user._id)
        res.json({success:true , token})


    } catch (error) {
        console.log(error)
        res.json({success : false , message:error.message})
    }

}

// user registration route
const registerUser = async (req , res) => {
    try {
        const {name , email , password} = req.body

        //checking user already exist or not
        const exist = await  userModel.findOne({email})
        if(exist) return res.status(200).json({success:false , message:"user already exist please login"})

        // validationg email formating and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false , message:"Please enter the valid email"})
        }
        if(password.length < 8){
            return res.json({success:false , message:"Please enter strong password"})
        }

        //hashing the password
        const salt = await bcript.genSalt(10)
        const hashedPassowrd = await bcript.hash(password , salt)

        const newUser = await userModel.create({
            name,
            email,
            password:hashedPassowrd
        })

        const token = createToken(newUser._id)
        console.log(token);
        
        res.json({success:true , token})

    } catch (error) {
        console.log(error)
        res.json({success : false , message:error.message})
    }
}

// admin login route
const adminLogin = async (req , res) => {

    try { 
        
        const {email,password} = req.body

        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD
        const secretTokenKey = process.env.JWT_SECRET
        if(email === adminEmail && password === adminPassword){
            const token =  jwt.sign(email+password , secretTokenKey)

            res.json({success : true , token})
        } else {

            res.json({success : false , message : "invalid credentials"})

        }

    } catch (error) {
        
        console.log(error)
        res.json({success : false , message:error.message})

    }

}

module.exports = {
    loginUser,
    registerUser,
    adminLogin
}