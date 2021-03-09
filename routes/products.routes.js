const { Router } = require("express");
const route  = Router();
const {
    createProduct, 
    getMyProducts, 
    getMyProduct
} = require("../controllers/product.controllers")

route
    .get("/myProducts", getMyProducts)
    .post("/add", createProduct)
    .get("/:myProduct", getMyProduct)

module.exports = route; 