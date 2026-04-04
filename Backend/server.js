console.log("🚀 Server file is running...");

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔗 Import Routes
const productRoutes = require('./routes/productRoutes');

// 🛢️ DB Connection
mongoose.connect('mongodb://127.0.0.1:27017/zenvy-store')
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("DB Error:", err));

// 🧪 Test route
app.get('/', (req, res) => {
    res.send("Backend is Running 🚀");
});

// 📦 Product API route
app.use('/api/products', productRoutes);

// 🚀 Start server
app.listen(5000, () => {
    console.log("🔥 Server running on http://localhost:5000");
});