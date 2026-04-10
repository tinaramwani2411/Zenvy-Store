const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// ✅ Place Order
router.post('/place', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.send("Order Placed ✅");
    } catch (err) {
        res.status(500).send(err);
    }
});

// ✅ Get Orders
router.get('/', async (req, res) => {
    const orders = await Order.find();
    res.json(orders);   // ✅ ONLY THIS
});

module.exports = router;