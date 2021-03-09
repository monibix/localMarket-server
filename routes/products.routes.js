const { Router } = require("express");
const route  = Router();
const {
    createProduct, 
    getMyProducts
} = require("../controllers/product.controllers")

route
    .get("/myProducts", getMyProducts)
    .post("/add", createProduct)

module.exports = route; 