// const mongoose = require('mongoose');


// const schemeSchema = new mongoose.Schema({
//     name: String,
//     category: String,
//     description: String,
//     eligibility: Object,
//     benefits: String,
//     application_deadline: Date,
//     status: String
// });
// module.exports = mongoose.model('Scheme', schemeSchema);

const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    eligibility: {
      type: String,
      required: true,
    },
    benefits: {
      type: String,
      required: true,
    },
    application_deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Scheme', schemeSchema);
