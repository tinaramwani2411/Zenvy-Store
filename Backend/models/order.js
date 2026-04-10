const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: Array,   // ✅ CHANGE HERE
    totalAmount: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);