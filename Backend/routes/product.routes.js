const express = require("express");
const Product = require("../models/product.model");

const router = express.Router();

// GET all products
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const { tag } = req.query;

    const filter = tag
      ? { tags: { $in: [tag.toLowerCase()] } }  // Match tag (case-insensitive optional)
      : {};

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

module.exports = router;
