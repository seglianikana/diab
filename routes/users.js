const express = require("express");
const router = express.Router();

const {
    createUser,
    changePassword,
    getUserList,
    editUser,
    deleteUser,
    getUserProfile
} = require("../controllers");

const {
    isPermitted,
} = require("../middlewares");

router
    .post("/", isPermitted(["admin"]), createUser)
    .get("/remove/:id", isPermitted(["admin"]), deleteUser)
    .put(   "/:id", editUser)
    .get("/:id",getUserProfile)
    .post("/", isPermitted(["admin"]), createUser)
    .put("/",isPermitted(['admin']), changePassword)
    .get("/", isPermitted(["admin"]), getUserList)


module.exports = router;
