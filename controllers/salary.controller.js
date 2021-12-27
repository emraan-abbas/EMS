const Salary = require('../models/salary.model');
const mongoose = require('mongoose');

// Creating Salarys
exports.create = async (req, res) => {
	// Validating Salary
	if (!req.body) {
		return res.status(400).send({
			message: 'Please Enter Some Data !',
		});
	}
	const salary = new Salary({
		salary_id: mongoose.Types.ObjectId(),
		amount: req.body.amount,
		annual: req.body.annual,
		bonus: req.body.bonus,
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
	try {
		await Salary.find().then((salary) => {
			res.status(200).json({
				status: true,
				data: salary,
			});
		});
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Error at Getting All Leaves !',
		});
	}
}; // Getting All Ends Here
