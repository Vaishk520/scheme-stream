const express = require('express');
const router = express.Router();
const Application = require('../models/applicationModel');
const Scheme = require('../models/schemeModel');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

// Route to submit an application (Normal users can apply)
router.post('/apply/:schemeId', auth, async (req, res) => {
    try {
        const scheme = await Scheme.findById(req.params.schemeId);
        if (!scheme) {
            return res.status(404).send('Scheme not found');
        }

        // Check if the user has already applied to the scheme
        const existingApplication = await Application.findOne({ 
            user: req.user._id, 
            scheme: req.params.schemeId 
        });
        if (existingApplication) {
            return res.status(400).send('You have already applied for this scheme');
        }

        const application = new Application({
            user: req.user._id,
            scheme: req.params.schemeId
        });

        await application.save();
        res.status(201).send('Application submitted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while submitting the application');
    }
});

// Route to get the application status for the current user
router.get('/status', auth, async (req, res) => {
    try {
        const applications = await Application.find({ 
            user: req.user._id 
        }).populate('scheme');

        if (applications.length === 0) {
            return res.status(404).send('No applications found');
        }

        res.status(200).send(applications);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching your application status');
    }
});

// Route for authorities to update application status
router.put('/update/:applicationId', auth, async (req, res) => {
    if (req.user.role !== 'authority') {
        return res.status(403).send('Access denied');
    }

    try {
        const application = await Application.findByIdAndUpdate(
            req.params.applicationId, 
            { status: req.body.status }, 
            { new: true }
        );

        if (!application) {
            return res.status(404).send('Application not found');
        }

        res.status(200).send(application);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while updating the application status');
    }
});

module.exports = router;