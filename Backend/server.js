console.log("🚀 Server file is running...");

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect('mongodb://127.0.0.1:27017/zenvy-store')
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("DB Error:", err));

// Test route
app.get('/', (req, res) => {
    res.send("Backend is Running 🚀");
});

// Start server
app.listen(5000, () => {
    console.log("🔥 Server running on http://localhost:5000");
});