const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('../models/itemModel');
const User = require('../models/userModel');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/auctionDB');
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const seedItems = async () => {
  try {
    await connectDB();

    // Clear existing items
    await Item.deleteMany({});

    // Get a sample user to be the seller
    const seller = await User.findOne();
    if (!seller) {
      console.log('Please create a user first');
      process.exit(1);
    }

    const items = [
      {
        name: 'Vintage Watch',
        description: 'A beautiful vintage watch from the 1950s',
        category: 'Accessories',
        startingPrice: 100,
        currentPrice: 100,
        imageUrl: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=500',
        endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        seller: seller._id,
        status: 'active'
      },
      {
        name: 'Gaming Console',
        description: 'Latest gaming console with controllers',
        category: 'Electronics',
        startingPrice: 300,
        currentPrice: 300,
        imageUrl: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500',
        endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        seller: seller._id,
        status: 'active'
      },
      {
        name: 'Antique Vase',
        description: 'Hand-painted Chinese vase from the Ming Dynasty',
        category: 'Art',
        startingPrice: 500,
        currentPrice: 500,
        imageUrl: 'https://images.unsplash.com/photo-1578500351865-d6c3706f46bc?w=500',
        endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        seller: seller._id,
        status: 'active'
      }
    ];

    await Item.insertMany(items);
    console.log('Sample items added successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedItems(); 