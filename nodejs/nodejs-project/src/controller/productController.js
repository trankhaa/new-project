// src/controller/productController.js

const Product = require('../model/productModel');

// Controller methods
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Tìm tất cả sản phẩm
        res.status(200).json(products); // Trả về danh sách sản phẩm
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error }); // Lỗi khi lấy sản phẩm
    }
};

const createProduct = async (req, res) => {
    console.log("Received request to create product:", req.body); // Log body của yêu cầu
    console.log("Uploaded file:", req.file); // Log thông tin tệp đã tải lên

    try {
        // Nếu có file được upload
        if (req.file) {
            // Gán tên file hoặc đường dẫn file vào product
            req.body.img = req.file.filename; 
            // Hoặc lưu cả đường dẫn nếu cần
            // req.body.image = `/public/img/${req.file.filename}`;
        }

        const newProduct = new Product(req.body); // Tạo sản phẩm mới từ dữ liệu gửi lên
        const savedProduct = await newProduct.save(); // Lưu sản phẩm vào MongoDB
        res.status(201).json(savedProduct); // Trả về sản phẩm mới được tạo
    } catch (error) {
        console.error("Error creating product:", error); // Log lỗi
        res.status(400).json({ message: 'Error creating product', error }); // Lỗi khi tạo sản phẩm
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params; // Lấy ID từ tham số URL
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true }); // Cập nhật sản phẩm
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' }); // Nếu không tìm thấy sản phẩm
        }
        res.status(200).json(updatedProduct); // Trả về sản phẩm đã cập nhật
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error }); // Lỗi khi cập nhật sản phẩm
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params; // Lấy ID từ tham số URL
    try {
        const deletedProduct = await Product.findByIdAndDelete(id); // Xóa sản phẩm
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' }); // Nếu không tìm thấy sản phẩm
        }
        res.status(200).json({ message: 'Product deleted successfully' }); // Xóa thành công
    } catch (error) {
        res.status(400).json({ message: 'Error deleting product', error }); // Lỗi khi xóa sản phẩm
    }
};

// Xuất các phương thức
module.exports = { 
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    Product // Xuất mô hình Product nếu cần
};
