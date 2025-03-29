const express = require('express');
const router = express.Router();
const Item = require('../models/itemModel');

// Get all active items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find({ status: 'active' })
      .populate('seller', 'firstName lastName')
      .populate('highestBidder', 'firstName lastName')
      .sort('-createdAt');

    if (!items) {
      return res.status(404).json({ message: 'No items found' });
    }

    console.log(`Found ${items.length} active items`);
    res.json({ items });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Server error while fetching items' });
  }
});

module.exports = router; 