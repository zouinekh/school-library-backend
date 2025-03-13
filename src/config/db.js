const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

mongoose.connection.on('connected', () => {
  console.log('MongoDB Event: Connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB Event Error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB Event: Disconnected');
});

module.exports = connectDB;