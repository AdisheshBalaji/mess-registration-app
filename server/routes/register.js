const express = require('express');
const router = express.Router();
const Mess = require('../models/Mess');
const Admin = require('../models/Admin'); // Ensure the correct Admin model is imported

// POST /api/register
router.post('/', async (req, res) => {
  const { email, mess } = req.body;

  if (!email || !mess) {
    return res.status(400).json({ error: "Email and mess are required" });
  }

  try {

     // Check if the email is already registered in any mess
    const existingRegistration = await Mess.findOne({ emails: email });
    if (existingRegistration) {
      return res.status(400).json({ error: `User already registered in ${existingRegistration.mess}` });
    }

    // Find mess document
    let messDoc = await Mess.findOne({ mess });

    // If it doesn't exist, create it
    if (!messDoc) {
      messDoc = new Mess({ mess, emails: [], limit: 3 }); // Default limit
    }

    // Check if already registered
    if (messDoc.emails.includes(email)) {
      return res.status(400).json({ error: "User already registered in this mess" });
    }

    // Check if limit reached
    if (messDoc.emails.length >= messDoc.limit) {
      return res.status(403).json({ error: "Mess limit reached" });
    }

    // Add user and save
    messDoc.emails.push(email);
    await messDoc.save();

    res.json({ message: `Registered ${email} to ${mess}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


router.get('/counts', async (req, res) => {
  try {
    const mess1 = await Mess.findOne({ mess: "Mess 1" });
    const mess2 = await Mess.findOne({ mess: "Mess 2" });

    console.log("Mess 1:", mess1);
    console.log("Mess 2:", mess2);



    res.json({
      "Mess 1": mess1 ? mess1.emails.length : 0,
      "Mess 2": mess2 ? mess2.emails.length : 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


router.get('/emails', async (req, res) => {
  try {
    const mess1 = await Mess.findOne({ mess: "Mess 1" });
    const mess2 = await Mess.findOne({ mess: "Mess 2" });

    res.json({
      "Mess 1": mess1 ? mess1.emails : [],
      "Mess 2": mess2 ? mess2.emails : []
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// DELETE /api/register
router.delete('/', async (req, res) => {
  const { email, mess } = req.body;

  if (!email || !mess) {
    return res.status(400).json({ error: "Email and mess are required for unregistration" });
  }

  try {
    const messDoc = await Mess.findOne({ mess });

    if (!messDoc) {
      return res.status(404).json({ error: "Mess not found" });
    }

    if (!messDoc.emails.includes(email)) {
      return res.status(400).json({ error: `User is not registered in ${mess}` });
    }

    // Remove email from mess emails array
    messDoc.emails = messDoc.emails.filter(e => e !== email);
    await messDoc.save();

    res.json({ message: `Unregistered ${email} from ${mess}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/admin/validate
router.post('/admin/validate', async (req, res) => {
  const { key } = req.body;

  if (!key) {
    return res.status(400).json({ error: "Admin key is required" });
  }

  try {
    console.log('Validating Admin Key:', key); // Debug log for the key being validated
    const isAdmin = await Admin.findOne({ key });
    console.log('Admin Key Validation Result:', isAdmin); // Debug log for the query result

    if (!isAdmin) {
      return res.status(403).json({ error: "Invalid admin key" });
    }

    res.json({ message: "Admin authenticated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
