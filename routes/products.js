const express = require("express");
const router = express.Router();


const {
    addGroupProduct,
    cleanGroup,
    getProducts,
    deleteGroupProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers");

router
    .get("/", getProducts)
    .post("/add-to-group",addGroupProduct,)
    .post("/remove-from-group",deleteGroupProduct)
    .post("/remove-all-group",cleanGroup)
    .post("/create", createProduct)
    .post("/update",updateProduct)
    .post("/delete",deleteProduct)

module.exports = router