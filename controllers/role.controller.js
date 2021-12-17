const Role = require('../models/role.model');
const bcrypt = require('bcrypt');

// Creating Roles
exports.create = async (req, res) => {
	// Validating Role
	if (!req.body) {
		return res.status(400).send({
			message: 'Please Enter Some Data',
		});
	}

	try {
		const obj = req.body;
		const role = await Role.create(obj);
		res.send(role);
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Error at creating Role !',
		});
	}
}; // Create Ends Here

// Getting All Roles
exports.findAll = async (req, res) => {
	try {
		await Role.find().then((role) => {
			res.status(200).json({
				status: true,
				data: role,
			});
		});
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Error at Getting All Employee !',
		});
	}
}; // Getting All Ends Here
