const Payroll = require('../models/payroll.model');
const mongoose = require('mongoose');

// Creating Payrolls
exports.create = async (req, res) => {
	// Validating Role
	if (!req.body) {
		return res.status(400).send({
			message: 'Please Enter Some Data !',
		});
	}
	const payroll = new Payroll({
		payroll_id: mongoose.Types.ObjectId(),
		date: req.body.date,
		report: req.body.report,
		total_amount: req.body.total_amount,
	});
	payroll
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

// Getting All Payrolls
exports.findAll = async (req, res) => {
	try {
		await Payroll.find().then((payroll) => {
			res.status(200).json({
				status: true,
				data: payroll,
			});
		});
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Error at Getting All Leaves !',
		});
	}
}; // Getting All Ends Here
