// controllers/scheme.js
const SchemeModel = require('../models/scheme');

// Controller to add a new scheme
const addScheme = async (req, res) => {
  const { name, category, description, eligibility, benefits, application_deadline, status } = req.body;
  
  // Ensure the user is an authority
  if (req.user.role !== 'authority') {
    return res.status(403).json({ message: 'Access denied, you must be an authority' });
  }

  try {
    const newScheme = new SchemeModel({
      name,
      category,
      description,
      eligibility,
      benefits,
      application_deadline,
      status,
      createdBy: req.user._id, // Attach the authority who created the scheme
    });

    await newScheme.save();
    res.status(201).json({ message: 'Scheme added successfully', scheme: newScheme });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { addScheme };
