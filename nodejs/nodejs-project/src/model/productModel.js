// src/model/productModel.js

const mongoose = require('mongoose');

// Product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product; // Xuất mô hình để sử dụng ở nơi khác
