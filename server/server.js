const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const registerRoute = require('./routes/register');


const adminRoute = require('./routes/admin');
const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // allow only the frontend
  credentials: true,
}));

// Parses JSON in incoming request bodies
app.use(express.json());


// API routes
app.use('/api/admin', adminRoute);
app.use('/api/register', registerRoute);

require('dotenv').config();
const uri = process.env.MONGO_URI;


// connects to a mongodb database
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Atlas connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Check if server is up
app.get('/', (req, res) => {
  res.send('Server is running');
});

