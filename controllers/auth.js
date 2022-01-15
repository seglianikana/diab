const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {User, RationGroup} = require("../db/models");
const path = require("path")
// const { passwordHash } = require('../utils/helpers');
const bcrypt = require("bcryptjs");
const pug = require("pug")

const {EXP, TOKEN_SECRET} = process.env

const login = async (req, res, next) => {
    const {
        password,
        ...user
    } = await User.findOne({email: req.body.email})
        .select({
            firstName: 1,
            lastName: 1,
            email: 1,
            role: 1,
            region: 1,
            password: 1
        })
        .populate("region")
        .map(d => d.toObject())
        .orFail()

    const validPass = await bcrypt.compare(req.body.password, password)
    if (!validPass) {
        next(new Error("Invalid password"))
    }

    const token = jwt.sign(user, TOKEN_SECRET, {expiresIn: EXP})
    if (!token) {
        next(new Error("Couldn't sign the token"))
    }

    const template = await pug.renderFile(path.resolve(__dirname, "../views/test.pug"), {})

    res.send({
        token,
        user
    })
    res.setHeader("Content-Type", "text/html")
    res.send(template)
}

const getRegisterPage = async (req, res) => {
    const template = await pug.renderFile(path.resolve(__dirname, "../views/signup.html"), {})
    res.send(template);
}

const getLoginPage = async (req, res) => {
    const template = await pug.renderFile(path.resolve(__dirname,  "../views/login.html" ), {})
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
