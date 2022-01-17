const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {User, RationGroup} = require("../db/models");
const path = require("path")
// const { passwordHash } = require('../utils/helpers');
const bcrypt = require("bcryptjs");
const pug = require("pug")

const JWT_SECRET = "fsfdsf"

const login = async (req, res, next) => {
    const {email, password} = req.body
    console.log(req.body)
    const foundUser = (await User.findOne({email})).toObject()

    const validPass = await bcrypt.compare(password, foundUser.password)
    if (!validPass) {
        next(new Error("Invalid password"))
    }

    delete foundUser.password

    const token = jwt.sign(foundUser, JWT_SECRET, {expiresIn: 10000000000})

    if (!token) {
        next(new Error("Couldn't sign the token"))
    }
    res.set('Authorization', token)
    req.user = foundUser
    res.render("index",{user:foundUser});
}

const getRegisterPage = async (req, res) => {
    const template = await pug.renderFile(path.resolve(__dirname, "../views/signup.html"), {})
    res.send(template);
}

const getLoginPage = async (req, res) => {
    const template = await pug.renderFile(path.resolve(__dirname, "../views/login.html"), {})
    res.send(template);
}

const register = async (req, res, next) => {
    const createdUser = await User.findOne({email: req.body.email})

    !createdUser || next(new Error("User already exists"))

    const {
        password,
        ...bodyValues
    } = req.body

    bodyValues.password !== bodyValues.password_confirmation || next(new Error("passwords are not the same"))
    delete bodyValues.password_confirmation

    bodyValues.password = await bcrypt.hash(password, 10)

    const rationGroup = await RationGroup.create({products: []})
    bodyValues.rationGroup = rationGroup._id

    const user = await User.create(bodyValues)
    rationGroup.ownerId = user._id
    await rationGroup.save()

    res.send("You have successfully registered!")
}

module.exports = {
    login: asyncHandler(login),
    register: asyncHandler(register),
    getRegisterPage: asyncHandler(getRegisterPage),
    getLoginPage: asyncHandler(getLoginPage)
}
