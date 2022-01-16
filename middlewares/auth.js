const jwt = require('jsonwebtoken')
const pug = require("pug");
const path = require("path");
const secret = process.env.JWT_SECRET

module.exports = function isAuth(req, res, next) {
    const token = req.header('Authorization')
    if (!token) {
        next(new Error('No token, authorization denied'))
    }
    try {
        const decoded = jwt.verify(token, secret)
        req.user = decoded
        next()
    } catch (e) {
        next(e)
    }
}

