const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // enable CORS so frontend can call backend

// Connect to MongoDB (replace <username>, <password>, <dbname> with your details)
mongoose.connect(
  "mongodb+srv://adisheshbalaji:Sp4dIrl6VPTPJ3PL@cluster0.3ilm7rl.mongodb.net/",
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Define Student schema
const studentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  mess: { type: String, enum: ['Mess 1', 'Mess 2'], required: true }
});

const Student = mongoose.model('Student', studentSchema);

// API to register or update mess for a student
app.post('/api/change-mess', async (req, res) => {
  const { email, mess } = req.body;
  if (!email || !mess) {
    return res.status(400).json({ error: 'Missing email or mess' });
  }
  try {
    // Upsert: insert new or update existing student's mess
    const student = await Student.findOneAndUpdate(
      { email },
      { mess },
      { new: true, upsert: true }
    );
    res.json({ message: 'Mess updated', student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to get all students grouped by mess (for admin)
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find({});
    const mess1 = students.filter(s => s.mess === 'Mess 1').map(s => s.email);
    const mess2 = students.filter(s => s.mess === 'Mess 2').map(s => s.email);
    res.json({ mess1, mess2 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
