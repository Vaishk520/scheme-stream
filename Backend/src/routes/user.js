const express = require('express');
const router = express.Router();

// Define a test route
router.get('/', (req, res) => {
  res.send('User route is working!');
});

//user Registeration
router.post('/register', (req, res) => {
  // Logic for registering a new user (e.g., saving user to MongoDB)
  const { username, email, password } = req.body;
  // Add validation and registration logic here...
  res.json({ message: 'User registered successfully!' });
});

//mongoose to create a user model to store in MongoDB
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);
module.exports = User;

const user = require('../models/user');

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});


router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Continue with logic
  res.status(200).json({ message: 'User data received successfully' });
});



const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ message: 'Login successful!', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});


module.exports = router;