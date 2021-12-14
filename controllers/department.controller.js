const Department = require('../models/department.model');

// Creating Department
exports.create = async (req, res) => {
	// Validating Note
	if (!req.body) {
		return res.status(400).send({
			message: 'Please Enter Some Data',
		});
	}

	try {
		const obj = req.body;
		const department = await Department.create(obj);
		res.send(department);
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Error at creating Department !',
		});
	}
}; // Create Ends Here
