const express = require("express");
const router = express.Router();

const {
    test, testUnsuccess, testSuccess
} = require("../controllers");

router
    .get("/", (req, res, next) => test(req, res, next))
    .get("/count", (req, res, next) => testSuccess(req, res, next))

module.exports = router