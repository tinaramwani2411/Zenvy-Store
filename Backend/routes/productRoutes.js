const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ➕ Add product
router.post('/add', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.send("Product Added ✅");
    } catch (err) {
        res.status(500).send(err);
    }
});

// 📥 Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;