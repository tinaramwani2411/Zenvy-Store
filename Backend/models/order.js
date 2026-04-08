const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: Array,
    totalAmount: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);