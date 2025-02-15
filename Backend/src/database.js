const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables from .env file

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // Remove the deprecated options
      // useNewUrlParser: true,    // Remove this
      // useUnifiedTopology: true // Remove this
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);  // Exit the process if database connection fails
  }
};

module.exports = connectDB;
