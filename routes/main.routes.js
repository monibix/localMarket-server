const { Router } = require("express")
const route = Router()
const {
    getProductsByCategory, 
    getProductByCategory, 
    getSellerDetails, 
    getSearchProducts
} = require("../controllers/main.controllers")

route
    .get("/category", getProductsByCategory) 
    .get("/category/:productId", getProductByCategory)
    .get("/seller/:sellerId", getSellerDetails)
    .get("/query", getSearchProducts)

module.exports = route