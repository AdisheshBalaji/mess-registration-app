const express = require('express');
const router = express.Router();
const Mess = require('../models/Mess');

// POST /api/register
router.post('/', async (req, res) => {
  const { email, mess } = req.body;

  if (!email || !mess) {
    return res.status(400).json({ error: "Email and mess are required" });
  }

  try {
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



module.exports = router;
