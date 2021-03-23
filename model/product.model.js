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
        default: 'https://res.cloudinary.com/monibix/image/upload/v1616490406/LocalMarket/default-image_450_wbssaj.png'
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
    },
    {
        timestamps: { createdAt: true, updatedAt: true }
    }
)

module.exports = mongoose.model("Product", ProductSchema);

