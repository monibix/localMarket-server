const { Router } = require("express");
const route  = Router();
const {
    createProduct, 
    getMyProducts, 
    getMyProduct, 
    editProduct, 
    deleteProduct
} = require("../controllers/product.controllers")

route
    .get("/myProducts", getMyProducts)
    .post("/add", createProduct)
    .get("/:myProduct", getMyProduct)
    .put("/:myProduct", editProduct)
    .delete("/:myProduct", deleteProduct)

module.exports = route; 