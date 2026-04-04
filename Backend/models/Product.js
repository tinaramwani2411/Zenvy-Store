const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    image: String,
    category: String,
    rating: Number
});

module.exports = mongoose.model("Product", productSchema);