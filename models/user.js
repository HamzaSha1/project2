const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'Nurse', 'Customer'],
    default: 'Customer',
  },
  address: String,
  phoneNumber: Number,
  avatar: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);