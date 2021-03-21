require('../app')
const Product = require("../model/product.model")
const User = require("../model/user.model")

exports.createProduct = async (req, res) => {
    try {
        const { userId: sellerId } = req.session;
        console.log("selleri", sellerId)
        const product = await Product.create({ ...req.body, seller: sellerId });
        const updatedUser = await User.findByIdAndUpdate(
        sellerId,
        { $push: { userProducts: product._id } },
        { new: true, omitUndefined: true }
        ); //no asocia producto a usuario
        console.log("user", updatedUser);
        res.status(200).json(product);
    } catch (error) {
        console.log("error create product", error)
        return res.status(400).json({ message: "error when creating a product" });
    }
};

exports.getMyProducts = async(req, res) => {
    try {
        // const allProducts = await Product.find();
        // //console.log("allproducts", allProducts)
        // res.status(200).json(allProducts)
        //coger sólo productos del array de productos de dicho usuario
        // let userProducts = await User.findOne().populate('userProducts')
        // res.status(200).json(userProducts)
        const {userId } = req.session;
        const products = await Product.find({seller: userId})
        console.log("procut", products)
        res.status(200).json(products)
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

