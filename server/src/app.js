const express = require('express');
const cors = require('cors');
// Import the routes we just created
const postRoutes = require('./routes/posts');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount the Post Routes
// This tells the app: "Any request starting with /api/posts goes to postRoutes"
app.use('/api/posts', postRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = app;