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
    getMyFavourites, 
    getSellerDetails
} = require("../controllers/product.controllers")

route
    .get("/myProducts", getMyProducts)
    .get("/favourites", getMyFavourites)
    .post("/add", createProduct)
    .post("/upload", fileParser.single("mainImage"), uploadProductImage)
    .get("/:myProduct", getMyProduct)
    .put("/:myProduct", editProduct)
    .delete("/:myProduct", deleteProduct)

module.exports = route; 