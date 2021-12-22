const Role = require('../models/role.model');

// Creating Roles
exports.create = async (req, res) => {
	// Validating Role
	if (!req.body) {
		return res.status(400).send({
			message: 'Please Enter Some Data OR Role Already Exist !',
		});
	}

	try {
		const found = await Role.findOne({ name: req.body.name });
		if (found) {
			res.status(401).json({ message: 'Role ALready Exist !' });
		} else {
			try {
				const obj = req.body;
				const role = await Role.create(obj);
				res.send(role);
			} catch (error) {
				res.status(500).send({
					message: error.message || 'Error at creating Role !',
				});
			}
		}
	} catch (err) {
		return res.status(200).json({
			message: 'TRY CATCH BLOCK ERROR (Role) !',
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
