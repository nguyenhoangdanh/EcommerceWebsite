const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const router = express.Router();
const Category = require("../model/categories");
const ErrorHandler = require("../utils/ErrorHandle");
const { upload } = require("../multer");
const fs = require("fs");
const path = require("path");
//create product
router.post(
  "/create-category",
  upload.single("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description } = req.body;
      const categoryName = await Category.findOne({ name });

      if (categoryName) {
        const filename = req.file.filename;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Error deleting file" });
          }
        });
        return next(new ErrorHandler("User already exists", 400));
      }

      const filename = req.file.filename;
      const fileUrl  = path.join(filename);
      const categoryData = req.body;
      categoryData.images = fileUrl;

      const category = await Category.create(categoryData);

      res.status(201).json({
        success: true,
        category,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
