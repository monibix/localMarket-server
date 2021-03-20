const Product = require("../model/product.model")
const User = require("../model/user.model")

//Public products
exports.getProductsByCategory = async(req, res) => {
    const { category } = req.query;
    console.log("query", req.query)
    const products = await Product.find({ category });
    res.status(200).json(products)
}

exports.getProductByCategory = async(req, res) => {
    try {
        const { productId } = req.params
        console.log("productId", productId)
        const product = await Product.findById(productId)
        res.status(200).json(product)
    } catch (error) {
        return res.status(400).json({ message: "error when getting a single products" })
    }
}

exports.getSellerDetails = async(req, res) => {
    try {
        const{ sellerId } = req.params
        const seller = await User.findById(sellerId)
        return res.status(200).json(seller)
    } catch (error) {
        return res.status(400).json({ message: "error when getting seller details" })
    }
}

exports.getSearchProducts = async(req, res) => {
    const {query} = req.query
    console.log("query", query)
    const searchedProduct = await Product.find({ "title": { "$regex": req.query, "$options": "i" } })
    console.log("searchedproduc", searchedProduct)
    res.status(200).json(searchedProduct)
}