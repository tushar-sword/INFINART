const express = require("express");
const Product = require("../models/product.model");

const router = express.Router();

// GET all products with optional tag or storeName filter
router.get("/", async (req, res) => {
  try {
    const { tag, store } = req.query;

    const filter = {};

    if (tag) {
      filter.tags = { $in: [tag.toLowerCase()] };
    }

    if (store) {
  filter.storeName = { $regex: new RegExp(`^${store}$`, "i") }; // case-insensitive exact match
}

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// (Optional) GET products by storeName as a path param route if needed
router.get("/store/:storeName", async (req, res) => {
  try {
    const { storeName } = req.params;

    const products = await Product.find({ storeName });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this store" });
    }

    res.json(products);
  } catch (err) {
    console.error("Error fetching store products:", err);
    res.status(500).json({ error: "Server error fetching store products" });
  }
});

// GET product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

module.exports = router;
