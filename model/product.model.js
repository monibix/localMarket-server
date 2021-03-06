const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title:{
        type: String, 
        require: true, 
    }, 
    ref: {
        type: String, 
        unique: true
    },
    category:{
        type: [String],
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
        default: "El uso de Lorem Ipsum permite a los diseñadores reunir los diseños y la forma del contenido antes de que el contenido se haya creado, dando al diseño y al proceso de producción más libertad. El Lorem Ipsum fue concebido como un texto de relleno, formateado de una cierta manera para permitir la presentación de elementos gráficos en documentos, sin necesidad de una copia formal."  
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

