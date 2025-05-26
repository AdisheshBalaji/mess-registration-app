const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const registerRoutes = require('./routes/register');
const adminRoutes = require('./routes/admin'); // Import admin routes
const menuRoutes = require('./routes/menu'); // Import menu routes
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/register', registerRoutes);
app.use('/api/admin', adminRoutes); // Register admin routes
app.use('/api/menu', menuRoutes); // Register menu routes

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:');
  console.error(err);
});

if (process.env.POPULATE_MENUS === 'true') {
  const populateMenus = require('./scripts/populateSampleMenus');
  populateMenus();
}
