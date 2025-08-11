import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from './models/userModel.js'; // adjust path to your User model

// Connect to Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to Atlas');

    // Create the raad / 123 user
    await User.create({
      username: 'raad',
      password: '123'
    });

    console.log('✅ User added');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Connection error:', err);
    process.exit(1);
  });
