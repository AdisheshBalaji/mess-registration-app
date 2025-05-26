require('dotenv').config({ path: '../.env' }); // Explicitly specify the path to the .env file

const mongoose = require('mongoose');
const crypto = require('crypto');
const Admin = require('../models/Admin'); // Updated to use the correct Admin model

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log('MONGO_URI:', process.env.MONGO_URI); // Debug log to check MONGO_URI value

const generateAdminKeys = async () => {
  try {
    const keys = [];
    for (let i = 0; i < 10; i++) { // Generate 10 keys
      const key = crypto.randomBytes(16).toString('hex'); // 32-character hex key
      keys.push({ key });
    }

    // Save keys to the database
    await Admin.insertMany(keys);
    console.log('Admin keys generated and saved:', keys);

    mongoose.connection.close();
  } catch (err) {
    console.error('Error generating admin keys:', err);
    mongoose.connection.close();
  }
};

generateAdminKeys();
