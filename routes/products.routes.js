const { Router } = require("express");
const route  = Router();
const fileParser = require('../config/cloudinary-setup.config')
const {
    createProduct, 
    getMyProducts, 
    getMyProduct, 
    editProduct, 
    deleteProduct
} = require("../controllers/product.controllers")

route
    .get("/myProducts", getMyProducts)
    .post("/add", fileParser.single('mainImage'), createProduct)
    .get("/:myProduct", getMyProduct)
    .put("/:myProduct", editProduct)
    .delete("/:myProduct", deleteProduct)

module.exports = route; 