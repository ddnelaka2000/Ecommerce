const express = require('express');
const router = express.Router();
const Product = require('../models/Products');
const upload = require('../Config/multer'); 
const { authenticate } = require('../auth/auth');

router.post('/', upload.array('images'), async (req, res) => {
  try {
      const { sku, name, description, price, vendorId } = req.body;
      const files = req.files;

      if (!sku || !name || !description || !price || !vendorId || files.length === 0) {
          return res.status(400).json({ message: 'All fields are required' });
      }

      const imagePaths = files.map(file => file.path);
      const thumbnail = imagePaths[0];  

      const newProduct = new Product({
          vendorId,
          sku,
          name,
          description,
          price,
          images: imagePaths,
          thumbnail
      });

      await newProduct.save();
      res.status(201).json({
          message: "Product added successfully",
          product: newProduct
      });
  } catch (err) {
    console.error('Error saving product:', err);
      res.status(500).json({ error: err.message });
  }
});


// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Edit a product
router.put('/:id',  async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.put('/:id', async (req, res) => {
  try {
      const updateData = req.body;
      const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!product) return res.status(404).json({ error: 'Product not found' });
      res.json(product);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});
router.get('/favorites', async (req, res) => {
  try {
      
      const favorites = await Product.find({ isFavorite: true });
      console.log
      res.json(favorites);
  } catch (err) {
      console.error('Error fetching favorite products:', err.message);
      res.status(500).json({ error: err.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
