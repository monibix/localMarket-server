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
        const productInfo = req.body
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
        await Product.findByIdAndRemove(myProduct)
        res.status(200).json(myProduct)
    } catch (error) {
        return res.status(400).json({ message: "error when deleting a product" })
    }
}

exports.uploadProductImage = async(req, res, next) => {
    if(!req.file) {
        next (new Error ("No file uploaded"));
    }
    console.log("image", req.file.path)
    res.json(req.file.path)
}

