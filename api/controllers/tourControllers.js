const express = require('express');
const Tour = require('./../models/tourModel');

const app = express();

exports.getAllTours = async (req, res) => {
  try {
    //Building Query
    let queryObj = { ...req.query };

    // Basic Filtering
    // Excluding standard query fields
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    // excludedFields.forEach((el) => delete queryObj[el]);
    for (let i = 0; i < 4; i++) {
      delete queryObj[excludedFields[i]];
    }

    // Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    queryObj = JSON.parse(queryStr);
    console.log(queryStr);

    // Method 1
    let query = Tour.find(queryObj);

    // Sorting, If sort query is present
    // console.log(req.query.sort);
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
      console.log(sortBy);
    } else {
      //Deafult sorting
      query = query.sort('-createdAt');
    }

    // Method 2 - (Hardcoding of method 1)
    // const allTour = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy',
    // });

    // Method 3
    // const allTour = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // Executing Query
    const allTour = await query;

    res.status(200).json({
      status: 'success',
      results: allTour.length,
      data: {
        allTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  // console.log(req.params);
  try {
    const id = req.params.id;

    const result = await Tour.findById(id);

    // const tour = tours[id];
    res.status(200).json({
      status: 'success',
      data: {
        result,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const id = req.params.id;
    const newTour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const id = req.params.id;
    await Tour.findByIdAndDelete(id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      messege: err,
    });
  }
};
