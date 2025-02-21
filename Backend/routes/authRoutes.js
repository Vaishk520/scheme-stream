const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Register User
router.post('/register', async (req, res) => {
    try {
        console.log('✅ Register endpoint hit');  
        console.log('📨 Request body:', req.body);  // Log incoming data

        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            console.error('❌ Missing Fields');
            return res.status(400).json({ message: 'All fields (email, password, role) are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.warn('⚠️ User already exists');  
            return res.status(400).json({ message: 'User already exists' });
        }

        console.log('🔒 Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('✅ Password hashed successfully');

        console.log('💾 Saving user...');
        const user = new User({ email, password: hashedPassword, role });
        await user.save();
        console.log('✅ User saved successfully');

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('🚨 Error in register:', err.stack || err.message);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});


// Login User
router.post('/login', async (req, res) => {
    try {
        console.log("🔹 Received Login Request: ", req.body);
        
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ User not found");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.log("❌ Invalid password");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("✅ Login successful, Token Generated");
        res.json({ token, user });
    } catch (err) {
        console.error('🔥 Error in login:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});


// Logout User
router.post('/logout', (req, res) => {
    try {
        res.header('Authorization', '').send('Logged out successfully');
    } catch (err) {
        console.error('Error in logout:', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;