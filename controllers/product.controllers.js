require('../app')
const Product = require("../model/product.model")
const User = require("../model/user.model")

exports.createProduct = async (req, res) => {
    try {
        const { userId: sellerId } = req.session;
        const product = await Product.create({ ...req.body, seller: sellerId });
        const updatedUser = await User.findByIdAndUpdate(
        sellerId,
        { $push: { userProducts: product._id } },
        { new: true, omitUndefined: true }
        ); 
        console.log("user", updatedUser);
        res.status(200).json(product);
    } catch (error) {
        console.log("error create product", error)
        return res.status(400).json({ message: "An error ocurred. Please try again" });
    }
};

exports.getMyProducts = async(req, res) => {
    try {
        console.log("entra en getmy products")
        const {userId } = req.session;
        const products = await Product.find({seller: userId})
        
        res.status(200).json(products)
    } catch (error) {
        return res.status(400).json({ message: "error when getting all products" })
    }
}

exports.getMyProduct = async(req, res) => {
    try {
        console.log("entra en my product")
        const { myProduct } = req.params
        const product = await Product.findById(myProduct)
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
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

//CHECK FAVOURITES
exports.getMyFavourites = async(req, res) => {
    try {
        const {userId } = req.session;
        const userInfo = await User.findById(userId).populate("favourites")
        const favourites = userInfo.favourites
        console.log("favorites", favourites)
        return res.status(200).json(favourites)
    } catch (error) {
        console.log(error)
    }
}

//CHECK SELLER DETAILS!
// exports.getSellerDetails = async(req, res) => {
//     console.log("getSellerDetails PRODUCT CONTROLLERS")
//     try {
//         const{ sellerId } = req.params
//         console.log("sellerid", sellerId)
//         const seller = await User.findById(sellerId).populate("userProducts")
//         console.log("seller - userProducts - POPULATE", seller)
//         return res.status(200).json(seller)
//     } catch (error) {
//         console.log(error)
//         return res.status(400).json({ message: "error when getting seller details" })
//     }
// }