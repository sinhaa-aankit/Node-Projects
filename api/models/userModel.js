const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please write your name!'],
    trim: true,
    maxLength: [35, 'name must be less than 35 characters'],
    minLength: [3, 'name must be more than 3 characters'],
  },
  email: {
    type: String,
    required: [true, 'Provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Give a password'],
    minLength: [8, 'Password must be atleast 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm your password'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
