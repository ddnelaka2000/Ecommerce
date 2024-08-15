const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://nelakadave:6uUlFA3egk0Q9L8r@cluster0.gp7yr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/uploads', express.static('uploads'));



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
