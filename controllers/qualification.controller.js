const Qualification = require('../models/qualification.model');
const mongoose = require('mongoose');

// Creating Qualifications
exports.create = async (req, res) => {
	// Validating Role
	if (!req.body) {
		return res.status(400).send({
			message: 'Please Enter Some Data !',
		});
	}
	const qualification = new Qualification({
		qualification_id: mongoose.Types.ObjectId(),
		position: req.body.position,
		requirements: req.body.requirements,
		date_in: req.body.date_in,
	});
	qualification
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

// Getting All Qualifications
exports.findAll = async (req, res) => {
	try {
		await Qualification.find().then((qualification) => {
			res.status(200).json({
				status: true,
				data: qualification,
			});
		});
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Error at Getting All Leaves !',
		});
	}
}; // Getting All Ends Here
