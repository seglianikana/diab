const express = require("express");
const router = express.Router();


const {
    test, testUnsuccess, testSuccess
} = require("../controllers");

router
    .get("/", (req, res, next) => test(req, res, next))
    .get("/win", (req, res, next) => testSuccess(req, res, next))
    .get("/lose", (req, res, next) => testUnsuccess(req, res, next))

module.exports = router