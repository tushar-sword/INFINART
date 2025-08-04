const userModel = require('../models/user.model');
const Blog = require('../models/blog.model');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator');

//handle User registration 
module.exports.registerUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(404).json({ errors: error.array() });
  }

  console.log(req.body);
  const { fullname, email, password } = req.body;

  if (!fullname || !fullname.firstname || !fullname.lastname) {
    return res.status(400).json({ message: 'Fullname fields are required' });
  }

  const { firstname, lastname } = fullname;
  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  const token = await user.generateAuthToken();
  res.status(201).json({ token, user });
};

//handle User login
module.exports.loginUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(404).json({ errors: error.array() });
  }

  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await userModel.findOne({ email }).select('+password');

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = await user.generateAuthToken();
  res.status(200).json({ token, user });
};

//handle User profile
module.exports.userProfile = (req, res) => {
  if (!req.user) {
    return res.status(404).json({ success: false, user: null });
  }
  res.status(200).json({
    success: true,
    user: req.user
  });
};


//handle Blog creation
module.exports.createBlog = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(404).json({ message: "Invalid data" });
  }

  console.log(req.body);
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ message: 'Title, content, and author are required' });
  }

  // Check if an image is uploaded
  let imageUrl = null;
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`; // The image will be stored under 'uploads/' folder
  }

  const blog = await userService.createBlog({
    title,
    content,
    author,
    image: imageUrl, // Store image URL/path
  });

  res.status(201).json({ blog });
};

//handle Get all blogs
// Fix this:
exports.getBlogs = async (req, res) => {
  console.log("GET /users/blogs hit ✅");

  try {
    const blogs = await Blog.find();
    console.log("Blogs fetched:", blogs);
    res.status(200).json({ blogs }); // ✅ Wrap in object!
  } catch (error) {
    console.error("Error while fetching blogs ❌:", error);
    res.status(500).json({ message: error.message });
  }
};


//handle Get blog by id
module.exports.getBlog = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Blog ID is required' });
  }

  const blog = await userService.getBlogById(id);

  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  res.status(200).json({ blog });
};
