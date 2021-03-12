const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.cloudName,
    api_key: process.env.cloudKey,
    api_secret: process.env.cloudSecret
})

const storage = new CloudinaryStorage({
    cloudinary,
    folder: 'LocalMarket', // The name of the folder in cloudinary
    allowedFormats: ['jpg', 'png'],
    
    filename: function (req, res, cb) {
    cb(null, res.originalname); 
    }
});

const fileParser = multer({ storage });
module.exports = fileParser;