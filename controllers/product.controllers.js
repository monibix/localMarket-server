const Product = require("../model/product.model")

exports.createProduct = async(req, res) => {
    try {
        const sellerId = req.session.userId
        const product = await Product.create({...req.body, seller: sellerId })

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

exports.getMyProduct = async(req, res) => {
    try {
        const { myProduct } = req.params
        console.log("productId", myProduct)
        const product = await Product.findById(myProduct)
        res.status(200).json(product)
    } catch (error) {
        return res.status(400).json({ message: "error when getting a single products" })
    }
}

exports.editProduct = async(req, res) => {
    try {
        const { myProduct } = req.params
        console.log("product id edit", myProduct)
        const productInfo = req.body
        console.log("product info", req.body)
        const updateProduct = await Product.findByIdAndUpdate(myProduct, productInfo)
        res.status(200).json(updateProduct)
    } catch (error) {
        return res.status(400).json({ message: "error when edit a product" })
    }
}

exports.deleteProduct = async(req, res) => {
    try {
        const { myProduct } = req.params
        console.log("product id delete", myProduct)
        const deleteProduct = await Product.findByIdAndRemove(myProduct)
        res.status(200).json(deleteProduct)
    } catch (error) {
        return res.status(400).json({ message: "error when deleting a product" })
    }
}