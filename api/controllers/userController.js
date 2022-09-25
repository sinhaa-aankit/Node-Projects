const express = require('express');
const app = express();
const User = require('./../models/userModel');

exports.getAllUsers = async (req, res) => {
  const Users = await User.find();
  res.status(200).json({
    status: 'success',
    // message: 'This route is not yet defined',
    data: Users,
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
