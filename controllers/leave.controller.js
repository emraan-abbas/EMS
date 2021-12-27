const Leave = require('../models/leave.model');
const mongoose = require('mongoose');

// Creating Leave
exports.create = async (req, res) => {
	// Validating Leave
	if (!req.body) {
		return res.status(400).send({
			message: 'Please Enter Some Data',
		});
	}

	const leave = new Leave({
		_id: mongoose.Types.ObjectId(),
		date: req.body.date,
		reason: req.body.reason,
		payroll: req.body.payroll,
	});
	leave
		.save()
		// .select('_id email password name phone department')
		.then((result) => {
			res.status(201).json(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
}; // Create Ends Here

// Getting All Leaves
exports.findAll = async (req, res) => {
	Leave.find()
		.select('_id date reason')
		.populate('payroll', '_id date report total_amount')

		.exec()
		.then((data) => {
			res.status(200).json({
				count: data.length,
				leave: data,
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
}; // Getting All Ends Here
