const express = require('express');
const Tour = require('./../models/tourModel');

const app = express();

exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';
  next();
};

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
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      //Deafult sorting
      query = query.sort('-createdAt');
    }

    // Filtering, If fields query is present
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      //Default filtering
      query = query.select('-__v');
    }

    // Pagination, If page(Default 1) and limit(Default 10) query is present
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
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
