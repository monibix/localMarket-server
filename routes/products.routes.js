const { Router } = require("express");
const route  = Router();
const fileParser = require('../config/cloudinary-setup.config')
const {
    createProduct, 
    getMyProducts, 
    getMyProduct, 
    editProduct, 
    deleteProduct, 
    uploadProductImage, 
    getProductByCategory
} = require("../controllers/product.controllers")

route
    .get("/category", getProductByCategory) //public products
    .get("/myProducts", getMyProducts)
    .post("/add", createProduct)
    .post("/upload", fileParser.single("mainImage"), uploadProductImage)
    .get("/:myProduct", getMyProduct)
    .put("/:myProduct", editProduct)
    .delete("/:myProduct", deleteProduct)


module.exports = route; 