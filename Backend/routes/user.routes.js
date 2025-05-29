const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
const { body } = require("express-validator");
const multer = require("multer");
const path = require("path");

// ====== Multer Setup for Image Uploads ======
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder to save uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name using timestamp
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Max size: 50MB
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only images (jpeg, jpg, png, webp) are allowed"));
    }
  },
});

// ===== Routes =====

// Register route
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
  ],
  userController.registerUser
);

// Login route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser
);

// Get user profile
router.post("/userProfile", userController.userProfile);

// Create blog (with image upload)
router.post(
  "/blog",
  upload.single("image"),
  [
    body("title").isLength({ min: 3 }).withMessage("Title must be at least 3 characters long"),
    body("content").isLength({ min: 3 }).withMessage("Content must be at least 3 characters long"),
    body("author").isLength({ min: 3 }).withMessage("Author must be at least 3 characters long"),
  ],
  userController.createBlog
);

// Get all blogs
router.get("/getblogs", userController.getBlogs);

// Get blog by ID
router.get("/blog/:id", userController.getBlog);

module.exports = router;
