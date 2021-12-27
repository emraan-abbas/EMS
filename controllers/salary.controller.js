const Salary = require('../models/salary.model');
const mongoose = require('mongoose');

// Creating Salary
exports.create = async (req, res) => {
	// Validating Salary
	if (!req.body) {
		return res.status(400).send({
			message: 'Please Enter Some Data',
		});
	}

	const salary = new Salary({
		_id: mongoose.Types.ObjectId(),
		amount: req.body.amount,
		annual: req.body.annual,
		bonus: req.body.bonus,
		payroll: req.body.payroll,
	});
	salary
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

// Getting All Salarys
exports.findAll = async (req, res) => {
	Salary.find()
		.select('_id amount annual bonus')
		.populate('payroll', '_id date report total_amount')

		.exec()
		.then((data) => {
			res.status(200).json({
				count: data.length,
				salary: data,
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
}; // Getting All Ends Here
