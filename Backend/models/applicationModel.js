// const mongoose = require('mongoose');


// const applicationSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     scheme: { type: mongoose.Schema.Types.ObjectId, ref: 'Scheme', required: true },
//     status: { type: String, enum: ['applied', 'in-review', 'approved', 'rejected'], default: 'applied' },
//     appliedAt: { type: Date, default: Date.now }
// });
// module.exports = mongoose.model('Application', applicationSchema);

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    scheme: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Scheme', 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['applied', 'in-review', 'approved', 'rejected'], 
        default: 'applied' 
    },
    appliedAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Optional: Add an index for faster lookups by user and scheme
applicationSchema.index({ user: 1, scheme: 1 }, { unique: true });  // Prevents duplicate applications

module.exports = mongoose.model('Application', applicationSchema);
