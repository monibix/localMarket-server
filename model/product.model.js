const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title:{
        type: String, 
        require: true, 
        unique: true,
    }, 
    ref: {
        type: String, 
    },
    category:{
        type: [String],
        //require: true,
    },
    price: {
        type: Number,
        require: true, 
    },
    mainImage: {
        type: String, 
    }, 
    moreImages: {
        type: [String], 
        minItems: 0, 
        maxItems: 6,
    }, 
    description: {
        type: String,
    },
})

module.exports = mongoose.model("Product", ProductSchema);