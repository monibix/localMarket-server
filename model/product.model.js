const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title:{
        type: String, 
        require: true, 
        //unique: true,
    }, 
    ref: {
        type: String, 
        unique: true
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
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fredzonekickboxing.com%2Fhome%2Fdefault-image%2F&psig=AOvVaw11Gn2ic5Wv1RagqjUKKAp5&ust=1615993194744000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLjs3fSJte8CFQAAAAAdAAAAABAD",
        require: true,
    }, 
    moreImages: {
        type: [String], 
        minItems: 0, 
        maxItems: 6,
    }, 
    description: {
        type: String,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }, 
})

module.exports = mongoose.model("Product", ProductSchema);

