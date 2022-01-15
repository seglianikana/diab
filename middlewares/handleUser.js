const jwt = require('jsonwebtoken')
const {getUserProfile} = require("../controllers");

const asyncHandler = require("express-async-handler")
const JWT_SECRET = "fsfdsf"

module.exports = function handleUser(req, res, next) {
        const token = req.header('authorization')
        if (token) {
            try {
                const decoded = jwt.verify(token, JWT_SECRET)
                req.user = decoded
            } catch (e) {
                console.error(e.message, e.stack)
                next(new Error("go away"))
            }
        }else{
            next()
        }

}


