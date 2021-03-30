const Product = require("../model/product.model")
const User = require("../model/user.model")

//Public products
exports.getProductsByCategory = async(req, res) => {
    const { category } = req.query;
    const products = await Product.find({ category });
    res.status(200).json(products)
}

exports.getProductByCategory = async(req, res) => {
    try {
        const { productId } = req.params
        const product = await Product.findById(productId).populate("seller")
        res.status(200).json(product)
    } catch (error) {
        return res.status(400).json({ message: "error when getting a single products" })
    }
}

exports.getSearchProducts = async(req, res) => {
    try {
        const {query} = req.query
        const searchedProduct = await Product.find({ "title": { "$regex": query, "$options": "i" }})
        if (searchedProduct.length === 0) {
            res.status(200).json({message: "No hay productos coincidientes con tu búsqueda"})
        }
        res.status(200).json(searchedProduct)
    } catch (error) {
        console.log(error)
    }
}

//CHECK SELLER DETAILS!! 
exports.getSellerDetails = async(req, res) => {
    try {
        const{ sellerId } = req.params
        const seller = await User.findById(sellerId).populate("userProducts")
        return res.status(200).json(seller)
    } catch (error) {
        return res.status(400).json({ message: "error when getting seller details" })
    }
}

//CHECK FAVOURITES
exports.manageFavourites = async(req, res) => {
    try {
        const {userId} = req.session
        const { productId } = req.params
        let user = await User.findById(userId)
        let isFavourite = user.favourites.includes(productId)
        if (isFavourite) {
            await User.findByIdAndUpdate(userId, { $pull: { favourites: productId} }, { new: true })
        } else {
            await User.findByIdAndUpdate(userId, { $push: { favourites: productId} }, { new: true })
        }
        return res.status(200).json(isFavourite)
    } catch (error) {
        console.error(error)
    }
}

exports.saveOrder = async (req, res) => {
    try {
        let order = req.body
        const {userId} = req.session
        await User.findByIdAndUpdate(userId, { $push: { orders: order} }, { new: true })
    } catch (error) {
        console.log(error)
    }
}
