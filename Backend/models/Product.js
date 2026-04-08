const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    category: String,
    image: String,
    description: String,
    rating: Number
});

module.exports = mongoose.model('Product', productSchema);