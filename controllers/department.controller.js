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
		const found = await Department.findOne({ name: req.body.name });
		if (found) {
			res.status(401).json({ message: 'Department ALready Exist !' });
		} else {
			try {
				const obj = req.body;
				const department = await Department.create(obj);
				res.send(department);
			} catch (error) {
				res.status(500).send({
					message: error.message || 'Error at creating Department !',
				});
			}
		}
	} catch (err) {
		return res.status(200).json({
			message: 'TRY CATCH BLOCK ERROR (Department) !',
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
