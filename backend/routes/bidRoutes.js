const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  placeBid,
  getBids,
  getItemBids
} = require('../controllers/bidController');
const Bid = require('../models/bidModel');
const Item = require('../models/itemModel');
const auth = require('../middleware/auth');

// Place a bid
router.post('/:itemId', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    const itemId = req.params.itemId;

    // Validate bid amount
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: 'Please provide a valid bid amount' });
    }

    // Find the item
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if item is still active
    if (item.status !== 'active') {
      return res.status(400).json({ message: 'This auction has ended' });
    }

    // Check if bid is higher than current price
    if (amount <= item.currentPrice) {
      return res.status(400).json({ 
        message: `Bid must be higher than current price: $${item.currentPrice}` 
      });
    }

    // Create new bid
    const bid = new Bid({
      itemId: item._id,
      userId: req.user._id,
      amount: amount
    });

    // Save bid
    await bid.save();

    // Update item's current price and highest bidder
    item.currentPrice = amount;
    item.highestBidder = req.user._id;
    await item.save();

    // Get io instance
    const io = req.app.get('io');
    
    // Emit bid update event
    io.emit('bidUpdate', {
      itemId: item._id,
      currentPrice: amount,
      highestBidder: req.user._id
    });

    res.status(201).json(bid);
  } catch (error) {
    console.error('Place bid error:', error);
    res.status(500).json({ message: 'Error placing bid' });
  }
});

// Get user's bids
router.get('/my-bids', auth, async (req, res) => {
  try {
    const bids = await Bid.find({ userId: req.user._id })
      .populate({
        path: 'itemId',
        select: 'name imageUrl currentPrice status'
      })
      .sort('-createdAt');

    res.json(bids);
  } catch (error) {
    console.error('Get bids error:', error);
    res.status(500).json({ message: 'Error fetching bids' });
  }
});

router.get('/item/:itemId', getItemBids);

module.exports = router; 