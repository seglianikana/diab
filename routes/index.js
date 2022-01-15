const express = require("express")
const router = express.Router()
const {isAuth } = require("../middlewares")


const auth = require("./auth")
const users  = require("./users")
const products  = require("./products")
const custom = require("./custom")

router
    .use("/auth", auth)
    .use("/users", (req,res,next)=>isAuth(req,res,next), users)
    .use("/products", (req,res,next)=>isAuth(req,res,next), products)
    .use("/custom", (req,res,next)=>isAuth(req,res,next) ,custom)

module.exports = router
