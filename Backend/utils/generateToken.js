const jwt = require("jsonwebtoken")

const key = process.env.JWT_SECRET

const createToken = (id) => {
    return jwt.sign({id} , key)
}

module.exports = {createToken}