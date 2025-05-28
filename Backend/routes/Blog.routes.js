
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Blog.model');

// Get all Blogs
router.get('/', async (req, res) => {
  try {
    const blog = await Blog.find().sort({ date: -1 });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new Blog
router.post('/', async (req, res) => {
  const blog = new Blog({
    name: req.body.name,
    profilePicture: req.body.profilePicture,
    rating: req.body.rating,
    comment: req.body.comment
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
