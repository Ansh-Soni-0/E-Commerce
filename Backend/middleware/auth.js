const jwt = require("jsonwebtoken")

const authUser = async (req , res , next) => {
    const { token } = req.headers;

    if(!token) {
        return res.json({success : false , message : 'Not Authorized Login Again'})
    }

    try {

        const tokenDecode = jwt.verify(token , process.env.JWT_SECRET)

        req.body.userId = tokenDecode.id

        next()

    } catch (error) {
        console.log(error);
        res.json({success:false , message:error.message})
        
    }
}

module.exports = {authUser}