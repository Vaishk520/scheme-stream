const express = require('express');
const Scheme = require('../models/schemeModel');
const auth = require('../middleware/auth');  // Import authentication middleware
console.log("✅ schemeRoutes.js file loaded");

const router = express.Router();

// Middleware to check if the user is an authority
const checkAuthority = (req, res, next) => {
    if (req.user.role !== 'authority') {
        return res.status(403).json({ message: 'Access Denied: You do not have the required permissions.' });
    }
    next();  // Proceed to the next middleware/route handler
};

// Route to fetch all distinct categories
router.get('/categories', auth, async (req, res) => {
    try {
        // Fetch distinct categories only
        const categories = await Scheme.distinct('category');
        console.log("🔍 Fetched Categories:", categories);  // Log categories

        if (categories.length === 0) {
            return res.status(404).json({ message: 'No categories found.' });
        }

        res.json({ categories });  // Return only categories
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ message: 'Error fetching categories', error: err.message });
    }
});

// Route to create a new scheme (Authority only)
router.post('/', auth, checkAuthority, async (req, res) => {
    console.log("Request Body:", req.body);  // Log the request body to ensure all fields are being passed correctly

    const { title, description, category, eligibility, application_deadline, benefits } = req.body;

    // Ensure all necessary fields are present
    if (!title || !description || !category || !eligibility || !application_deadline || !benefits) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    try {
        // Create new scheme
        const newScheme = new Scheme({
            name: title,
            description,
            category,
            eligibility,
            application_deadline,
            benefits,
            createdBy: req.user._id,  // Use the authenticated user's ID from JWT
        });

        // Save scheme to DB
        const savedScheme = await newScheme.save();

        res.status(201).json(savedScheme);  // Return the created scheme
    } catch (err) {
        console.error('Error creating scheme:', err);
        res.status(500).json({ message: 'Error creating scheme', error: err.message });
    }
});

// Route to fetch all schemes
console.log("✅ schemeRoutes loaded");

router.get('/', async (req, res) => {  // Removed 'auth' middleware
    try {
        const schemes = await Scheme.find();
        if (schemes.length === 0) {
            return res.status(404).json({ message: 'No schemes found.' });
        }
        res.json({ schemes });
    } catch (err) {
        console.error('Error fetching schemes:', err);
        res.status(500).json({ message: 'Error fetching schemes', error: err.message });
    }
    router.get('/', (req, res) => {
        console.log("🔍 GET /api/schemes hit");
        res.json({ message: "Debug: API is working!" });
    });
    
});


// Route to update an existing scheme by id (Authority only)
router.put('/:id', auth, checkAuthority, async (req, res) => {
    const { id } = req.params;  // Extract the scheme id from the URL
    const { title, description, category, eligibility, application_deadline, benefits } = req.body;

    // Ensure the necessary fields are provided
    if (!title || !description || !category || !eligibility || !application_deadline || !benefits) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    try {
        // Find and update the scheme by id
        const updatedScheme = await Scheme.findByIdAndUpdate(
            id,
            {
                name: title,
                description,
                category,
                eligibility,
                application_deadline,
                benefits,
            },
            { new: true } // Return the updated scheme
        );

        if (!updatedScheme) {
            return res.status(404).json({ message: 'Scheme not found.' });
        }

        res.json(updatedScheme);  // Return the updated scheme
    } catch (err) {
        console.error('Error updating scheme:', err);
        res.status(500).json({ message: 'Error updating scheme', error: err.message });
    }
});

// Route to delete a scheme by id (Authority only)
router.delete('/:id', auth, checkAuthority, async (req, res) => {
    const { id } = req.params;  // Extract the scheme id from the URL

    try {
        // Find and delete the scheme by id
        const deletedScheme = await Scheme.findByIdAndDelete(id);

        if (!deletedScheme) {
            return res.status(404).json({ message: 'Scheme not found.' });
        }

        res.json({ message: 'Scheme deleted successfully.' });  // Return success message
    } catch (err) {
        console.error('Error deleting scheme:', err);
        res.status(500).json({ message: 'Error deleting scheme', error: err.message });
    }
});

module.exports = router;