const pug = require("pug");
const path = require("path");
const asyncHandler = require("express-async-handler");

const testSuccess = async (req, res) => {
    res.render("count", {
        title: "Homepage",
        user: req.user
    })
}

const testUnsuccess = async (req, res) => {
    const template = await pug.renderFile(path.resolve(__dirname, "../views/test-lose.html"), {})
    res.send(template);
    res.end()
}

const test = async (req, res) => {
    const {user} = req.body
    res.render("test", {
        title: "Homepage",
        user: user?user:null
      })
}


module.exports = {
    test: asyncHandler(test),
    testUnsuccess: asyncHandler(testUnsuccess),
    testSuccess: asyncHandler(testSuccess)
}