// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // for email/password method if needed
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
