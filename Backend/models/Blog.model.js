
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  Title: {
    type: String,
    required: true
  },
  Image: {
    type: Number,
    required: true,
  },
  Content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Blog', BlogSchema);
