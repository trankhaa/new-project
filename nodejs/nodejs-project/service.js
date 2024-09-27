const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path"); // Thêm import cho path
const multer = require("multer"); // Thêm import cho multer
require("dotenv").config(); // Load biến môi trường từ file .env

// Chú ý sửa đường dẫn cho đúng vị trí
const categoryRouter = require("./src/router/categoryRouter"); // Đường dẫn đúng đến file categoryRouter
const productRouter = require("./src/router/productRouter"); // Router cho Product

const app = express();

// Middleware
app.use(cors()); // Cho phép CORS
app.use(bodyParser.json()); // Parse body kiểu JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parse body kiểu URL-encoded

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/public", express.static(path.join(__dirname, "public"))); // Serve static files

// Cấu hình multer để lưu hình ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img"); // Thư mục lưu trữ hình ảnh
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Tên file duy nhất
  },
});
const upload = multer({ storage: storage });

// Routes
app.use("/category", categoryRouter); // Sử dụng router cho category
app.use("/products", upload.single("image"), productRouter); // Cần điều chỉnh tên trường hình ảnh cho đúng

// Khởi động server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
