const jwt = require("jsonwebtoken")

const adminAuth = async (req , res , next) => {
    try {
        const {token} = req.headers
        if(!token) return res.status(404).json({success:false , message:"Not Authorized Login Again"})

        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD
        const secretTokenKey = process.env.JWT_SECRET

        const tokenDecode = jwt.verify(token , secretTokenKey)

        if(tokenDecode !== adminEmail+adminPassword){
            return res.status(404).json({success : false , message : "Not Authorized Login Again"})
        }

        next();

    } catch (error) {
        console.log(error)
        res.json({success : false , message:error.message})
    }
}

module.exports = {adminAuth}