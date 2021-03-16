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

} = require("../controllers/product.controllers")

route
    .get("/myProducts", getMyProducts)
    .post("/add", createProduct)
    .post("/upload", fileParser.single("mainImage"), uploadProductImage)
    .get("/:myProduct", getMyProduct)
    .put("/:myProduct", editProduct)
    .delete("/:myProduct", deleteProduct)


module.exports = route; 