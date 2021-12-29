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
		employeeId: req.body.employeeId,
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

// Getting a Single Salary
exports.findOne = (req, res) => {
	// if no Salary
	try {
		Salary.find({ employeeId: req.params.id })
			.select('_id amount annual bonus employeeId')
			// .populate('employeeId', 'id')
			.then((salary) => {
				if (!req.body) {
					return res.status(404).send({
						message: 'Write something bro !: ',
					});
				}
				res.send(salary);
			});
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Error at Getting a Salary !',
		});
	}
}; // Getting a Single Ends Here

/* ---------- */
