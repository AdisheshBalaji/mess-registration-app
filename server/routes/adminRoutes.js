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

// Endpoint to fetch all mess data including emails and limits
router.get('/messes', async (req, res) => {
  try {
    const messes = await Mess.find();
    res.json(messes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Endpoint to update the limit of a specific mess
router.put('/messes/:messId/limit', async (req, res) => {
  const { messId } = req.params;
  const { newLimit } = req.body;

  try {
    const mess = await Mess.findByIdAndUpdate(messId, { limit: newLimit }, { new: true });
    if (!mess) {
      return res.status(404).json({ error: "Mess not found" });
    }
    res.json(mess);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
