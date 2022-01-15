const express = require("express");
const router = express.Router();

const { handleUser } = require("../middlewares")

const {
    login,
    register,
    getLoginPage,
    getRegisterPage
} = require("../controllers");

router
    .post("/login",(req,res,next)=>handleUser(req,res,next), login)
    .get("/check", (req, res) => res.json(req.user))
    .post("/register", handleUser, register)
    .get("/register",  (req,res,next)=>handleUser(req,res,next), getRegisterPage)
    .get("/login", getLoginPage)

module.exports = router;
