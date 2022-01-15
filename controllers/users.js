const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const {
    User,
    RationGroup
} = require("../db/models/")
const {register} = require("./auth")
const response = require("../utils/response")
const ejs = require("ejs")
const crypto = require("crypto")

const createUser = async (req, res) => {
    const register = await register(req, res)
    response(res)
        .success("User has been successfully created!");
};

const getUserList = async (req, res) => {
    const users = await User.find(
        {role: {$ne: "admin"}},
        {password: 0}
    ).map(docs => docs.map(d => d.toObject()));

    response(res)
        .success({
            users
        });
};

const changePassword = async (req, res) => {
    const {
        email,
        oldPassword,
        newPassword
    } = req.body;

    const user = await User.findOne({email});

    const equals = await bcrypt.compare(oldPassword, user.password);
    if (!equals) {
        response(res)
            .error("Invalid password");
    }

    const password = await bcrypt.hash(newPassword, 10);

    return User.findOneAndUpdate(
        {email},
        {password},
        {
            new: true,
            upser: true
        }
    )
        .then(() => response(res)
            .success("Password has changed"));
};

const editUser = async (req, res) => {
    const data = req.body;
    delete req.body.password;
    const user = await User.findOneAndUpdate(
        {_id: req.params.id},
        {...data},
        {
            upser: true,
            new: true
        }
    );
    response(res)
        .success(user);
};

const deleteUser = async (req, res) => {
    const user = await User.findOneAndUpdate(
        {_id: req.params.id},
        {deleted: true},
        {
            upser: true,
            new: true
        }
    );
    response(res)
        .success(user);
};

const getUserProfile = async (req, res, next, err) => {
    !err || next(err)
    const {id} = req.path.params
    const user = User.findOne({objectId: id})

    const result = await ejs.render("../templates/signup.ejs", user)

    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    res.end(result);
}

module.exports = {
    deleteUser: asyncHandler(deleteUser),
    editUser: asyncHandler(editUser),
    createUser: asyncHandler(createUser),
    changePassword: asyncHandler(changePassword),
    getUserList: asyncHandler(getUserList),
    getUserProfile: asyncHandler(getUserProfile)
}
