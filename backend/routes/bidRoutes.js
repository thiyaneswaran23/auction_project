const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getItemBids
} = require('../controllers/bidController');
const Bid = require('../models/bidModel');
const Item = require('../models/itemModel');


router.post('/:itemId', protect, async (req, res) => {
  try {
    const { amount } = req.body;
    const itemId = req.params.itemId;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: 'Please provide a valid bid amount' });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.status !== 'active') {
      return res.status(400).json({ message: 'This auction has ended' });
    }

    if (amount <= item.currentPrice) {
      return res.status(400).json({ 
        message: `Bid must be higher than current price: $${item.currentPrice}` 
      });
    }

    const bid = new Bid({
      itemId: item._id,
      userId: req.user._id,
      amount: amount
    });

    await bid.save();

    item.currentPrice = amount;
    item.highestBidder = req.user._id;
    await item.save();

    const io = req.app.get('io');
    
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

router.get('/my-bids', protect, async (req, res) => {
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
