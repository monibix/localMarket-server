const { Router } = require("express");
const route  = Router();
const {
    createProduct
} = require("../controllers/product.controllers")

route.post("/add", createProduct)

module.exports = route; 