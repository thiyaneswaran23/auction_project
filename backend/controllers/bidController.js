const Bid = require('../models/bidModel');
const Item = require('../models/itemModel');

// Place a bid
const placeBid = async (req, res) => {
  try {
    const { amount } = req.body;
    const { itemId } = req.params;
    const userId = req.user._id;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.status !== 'active') {
      return res.status(400).json({ message: 'Auction has ended' });
    }

    if (amount <= item.currentPrice) {
      return res.status(400).json({ message: 'Bid must be higher than current price' });
    }

    const bid = await Bid.create({
      itemId,
      userId,
      amount
    });

    // Update item's current price and highest bidder
    item.currentPrice = amount;
    item.highestBidder = userId;
    await item.save();

    // Emit socket event for real-time updates
    req.app.get('io').emit('newBid', {
      itemId,
      currentPrice: amount,
      highestBidder: userId
    });

    res.status(201).json(bid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user's bids
const getBids = async (req, res) => {
  try {
    const bids = await Bid.find({ userId: req.user._id })
      .populate('itemId')
      .sort('-createdAt');
    res.json(bids);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get item's bids
const getItemBids = async (req, res) => {
  try {
    const bids = await Bid.find({ itemId: req.params.itemId })
      .populate('userId', 'firstName lastName')
      .sort('-amount');
    res.json(bids);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  placeBid,
  getBids,
  getItemBids
}; 