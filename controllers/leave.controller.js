const Leave = require('../models/leave.model');
const mongoose = require('mongoose');

// Creating Leaves
exports.create = async (req, res) => {
	// Validating Role
	if (!req.body) {
		return res.status(400).send({
			message: 'Please Enter Some Data !',
		});
	}
	const leave = new Leave({
		leave_id: mongoose.Types.ObjectId(),
		date: req.body.date,
		reason: req.body.reason,
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
	try {
		await Leave.find().then((leave) => {
			res.status(200).json({
				status: true,
				data: leave,
			});
		});
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Error at Getting All Leaves !',
		});
	}
}; // Getting All Ends Here
