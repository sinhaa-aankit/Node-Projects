const express = require('express');
const Tour = require('./../models/tourModel');

const app = express();


exports.getAllTours = async (req, res) => {
	const allTour = await Tour.find();
	res.status(200).json({
		status: 'success',
		requestedAt: req.requestTime,
		data: {
			allTour
		}
	});
};

exports.getTour = async (req, res) => {
	// console.log(req.params);
	const id = req.params.id ;

	const result = await Tour.findOne({_id: id});

	// const tour = tours[id];
	res.status(200).json({
		status: 'success',
		data: {
			result
		}
	});

};

exports.createTour = async (req, res) => {
	try{
		const newTour = await Tour.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				 newTour
			}
		});

	}catch(err){
		res.status(400).json({
			status: 'failed',
			message: err
		})
	}
	

};

exports.updateTour = async (req, res) => {
	const id = req.params.id;
	const newTour = await Tour.updateOne({_id: id }, req.body);
	res.status(200).json({
		status: 'success',
		data:{
			newTour
		}
	});	
};

exports.deleteTour = async (req, res) => {
	
	const id = req.params.id;
	const newTour = await Tour.deleteOne({_id: id });

	res.status(200).json({
		status: 'success',
		data: {
			newTour
		}
	});
};