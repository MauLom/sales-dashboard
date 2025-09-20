const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String },
  dateOfBirth: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

// Index for user-specific queries
CustomerSchema.index({ userId: 1 });

module.exports = mongoose.model('Customer', CustomerSchema);
