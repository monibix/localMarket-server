const Product = require("../model/product.model")

exports.createProduct = async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        return res.status(400).json({ message: "error when creating a product" })
    }
}

exports.getMyProducts = async(req, res) => {
    try {
        const allProducts = await Product.find();
        console.log("allproducts", allProducts)
        res.status(200).json(allProducts)
    } catch (error) {
        return res.status(400).json({ message: "error when getting all products" })
    }
}