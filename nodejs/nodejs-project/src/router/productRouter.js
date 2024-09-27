// src/router/productRouter.js

const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

// Route to get all products
router.get('/', productController.getAllProducts);

// Route to create a new product
router.post('/', productController.createProduct);

// Route to update a product by ID
router.put('/:id', productController.updateProduct);

// Route to delete a product by ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;
