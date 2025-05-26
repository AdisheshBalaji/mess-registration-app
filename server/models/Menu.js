const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  day: { type: String, required: true }, // e.g., Monday, Tuesday
  mealType: { type: String, required: true }, // e.g., Breakfast, Lunch
  items: { type: [String], required: true }, // List of menu items
});

module.exports = mongoose.model('Menu', menuSchema);
