const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-testing';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Only start listening if we are not in test mode
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });