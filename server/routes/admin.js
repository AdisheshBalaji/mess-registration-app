const express = require('express');
const router = express.Router();
const Mess = require('../models/Mess');

// GET /api/register/counts - returns count of registered emails for each mess
router.get('/counts', async (req, res) => {
  try {
    const mess1 = await Mess.findOne({ mess: "Mess 1" });
    const mess2 = await Mess.findOne({ mess: "Mess 2" });

    res.json({
      "Mess 1": mess1 ? mess1.emails.length : 0,
      "Mess 2": mess2 ? mess2.emails.length : 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/mess1', async (req, res) => {
  try {
    const mess = await Mess.findOne({ mess: "Mess 1" });
    res.json({ emails: mess ? mess.emails : [] });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/admin/mess2
router.get('/mess2', async (req, res) => {
  try {
    const mess = await Mess.findOne({ mess: "Mess 2" });
    res.json({ emails: mess ? mess.emails : [] });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});




module.exports = router;
