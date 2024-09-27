const mongoose = require('mongoose');

// Category schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
}, { timestamps: true });

// Category model
const Category = mongoose.model('Category', categorySchema);

// Controller methods
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find(); // Tìm tất cả các danh mục
        res.status(200).json(categories); // Trả về danh sách danh mục
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error }); // Lỗi khi lấy danh mục
    }
};

const createCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body); // Tạo danh mục mới từ dữ liệu gửi lên
        const savedCategory = await newCategory.save(); // Lưu danh mục vào MongoDB
        res.status(201).json(savedCategory); // Trả về danh mục mới được tạo
    } catch (error) {
        res.status(400).json({ message: 'Error creating category', error }); // Lỗi khi tạo danh mục
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params; // Lấy ID từ tham số URL
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true }); // Cập nhật danh mục
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' }); // Nếu không tìm thấy danh mục
        }
        res.status(200).json(updatedCategory); // Trả về danh mục đã cập nhật
    } catch (error) {
        res.status(400).json({ message: 'Error updating category', error }); // Lỗi khi cập nhật danh mục
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params; // Lấy ID từ tham số URL
    try {
        const deletedCategory = await Category.findByIdAndDelete(id); // Xóa danh mục
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' }); // Nếu không tìm thấy danh mục
        }
        res.status(200).json({ message: 'Category deleted successfully' }); // Xóa thành công
    } catch (error) {
        res.status(400).json({ message: 'Error deleting category', error }); // Lỗi khi xóa danh mục
    }
};

// Xuất các phương thức
module.exports = { 
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    Category // Xuất mô hình Category nếu cần
};
