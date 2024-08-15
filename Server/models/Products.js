const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  vendorId: { type: String, required: true },
  sku: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [String], // Array to store image paths
  thumbnail: { type: String }, 
  isFavorite: { type: Boolean, default: false }
  
});

module.exports = mongoose.model('Product', productSchema);
