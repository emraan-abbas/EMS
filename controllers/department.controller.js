const Department = require('../models/department.model');

// Creating Department
exports.create = async (req, res) => {
	// Validating Note
	if (!req.body) {
		return res.status(400).send({
			message: 'Please Enter Some Data',
		});
	}
	// Checking Existing Role
	Department.find({ name: req.body.name })
		.exec()
		.then((department) => {
			if (department.length >= 1) {
				return res.status(409).json({
					message: 'Department Already Exist !',
				});
			}
		});
	// Checking Existing Role

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

// Getting All Employees
exports.findAll = async (req, res) => {
	try {
		await Department.find()
			// .populate('employees', '_id name description role')
			.then((department) => {
				res.status(200).json({
					status: true,
					data: department,
				});
			});
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Error at Getting All Employee !',
		});
	}
}; // Getting All Ends Here
