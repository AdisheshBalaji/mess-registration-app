const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

// GET /api/menu - Fetch menu for a specific day and meal type
router.get('/', async (req, res) => {
  const { day, mealType } = req.query;

  if (!day) {
    return res.status(400).json({ error: 'Day is required' });
  }

  try {
    if (mealType) {
      // Fetch menu for a specific day and meal type
      const menu = await Menu.findOne({ day, mealType });
      if (!menu) {
        return res.status(404).json({ error: 'Menu not found' });
      }
      return res.json(menu);
    } else {
      // Fetch all meals for the specified day
      const menus = await Menu.find({ day });
      if (!menus.length) {
        return res.status(404).json({ error: 'No menus found for the specified day' });
      }
      return res.json(menus);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/menu - Create or update menu for a specific day and meal type
router.post('/', async (req, res) => {
  const { day, mealType, items } = req.body;

  if (!day || !mealType || !items) {
    return res.status(400).json({ error: 'Day, mealType, and items are required' });
  }

  try {
    const menu = await Menu.findOneAndUpdate(
      { day, mealType },
      { items },
      { new: true, upsert: true } // Create if not exists
    );
    res.json(menu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/menu - Delete menu for a specific day and meal type
router.delete('/', async (req, res) => {
  const { day, mealType } = req.body;

  if (!day || !mealType) {
    return res.status(400).json({ error: 'Day and mealType are required' });
  }

  try {
    const menu = await Menu.findOneAndDelete({ day, mealType });
    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }
    res.json({ message: 'Menu deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
