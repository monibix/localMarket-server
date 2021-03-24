const { Router } = require("express")
const route = Router()
const {
    getProductsByCategory, 
    getProductByCategory, 
    getSellerDetails, 
    getSearchProducts, 
    manageFavourites, 
    saveOrder
} = require("../controllers/main.controllers")

route
    .get("/category", getProductsByCategory) 
    .get("/category/:productId", getProductByCategory)
    .get("/seller/:sellerId", getSellerDetails)
    .get("/query", getSearchProducts)
    .post("/category/:productId", manageFavourites)
    .post("/shoppinglist", saveOrder)

module.exports = route