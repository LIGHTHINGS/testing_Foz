const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ' '
    },
    brand: {
        type: String,
        default: ' '
    },
    price:{ 
        type: Number,
        default: 0
    },
    manufacturer: {
        type: String,
        default: ' '
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;