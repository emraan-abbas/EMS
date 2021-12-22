const Employee = require('../models/employee.model');
const Role = require('../models/role.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authSignUp, authLogin } = require('../validations/employee.validate');
const mongoose = require('mongoose');

// Employee Sign Up
exports.signUp = async (req, res) => {
	// JOI STARTS HERE
	const { error, value } = authSignUp.validate(req.body); //JOI here validating
	if (error) {
		return res.json({
			message: error.message,
		});
	}
	// JOI ENDS HERE

	Employee.find({ email: req.body.email })
		.exec()
		.then((user) => {
			if (user.length >= 1) {
				return res.status(409).json({
					message: 'Email Already Exist !',
				});
			}
			// Validating Employee
			if (!req.body) {
				return res.status(400).send({
					message: 'Please Enter Some Data',
				});
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(500).json({
							error: err,
						});
					} else {
						// Added Block -- Replaced
						const employee = new Employee({
							_id: mongoose.Types.ObjectId(),
							email: req.body.email,
							password: hash,
							name: req.body.name,
							phone: req.body.phone,
							department: req.body.department,
							role: req.body.role,
						});
						employee
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
						// Added Block -- Replaced
					}
				});
			}
		});
};
// Sign Up End Here

//Employee Log In
exports.logIn = async (req, res) => {
	// JOI STARTS HERE
	const { error, value } = authLogin.validate(req.body); //JOI here validating
	if (error) {
		return res.json({
			message: error.message,
		});
	}
	// JOI ENDS HERE

	Employee.find({ email: req.body.email })
		.exec()
		.then((employee) => {
			if (employee.length < 1) {
				return res.status(404).json({
					message: 'No Email Found !',
				});
			}
			bcrypt.compare(req.body.password, employee[0].password, (err, result) => {
				if (err) {
					return res.status(401).json({
						message: 'Login Failed',
					});
				}

				// Getting Role through Email
				Employee.find({ email: req.body.email }).then((employee) => {
					Role.findById({ _id: employee[0].role }).then((val) => {
						console.log(val.name);
						//
						if (result) {
							const token = jwt.sign(
								{
									email: employee[0].email,
									role: val.name,
									id: employee[0].id,
								},
								process.env.JWT_KEY,
								{
									expiresIn: '1h',
								}
							);
							return res.status(200).json({
								message: 'Login Sucessful !',
								token: token,
							});
						}
						return res.status(401).json({
							message: 'Auth Failed',
						});
						//
					});
				});
				// Getting Role through Email - Ends Here
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};
//Log In Ends Here

/* ------------ BREAK ------------ */

// Creating Employees
exports.create = async (req, res) => {
	// Validating Note
	if (!req.body) {
		return res.status(400).send({
			message: 'Please Enter Some Data',
		});
	}

	const employee = new Employee({
		_id: mongoose.Types.ObjectId(),
		email: req.body.email,
		password: req.body.password,
		name: req.body.name,
		phone: req.body.phone,
		department: req.body.department,
		role: req.body.role,
	});
	employee
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

/* ---------- */

// Getting All Employees
exports.findAll = async (req, res) => {
	Employee.find()
		.select('_id email password name phone department role')
		.populate('department role', '_id name description role')
		.exec()
		.then((data) => {
			res.status(200).json({
				count: data.length,
				employee: data,
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
}; // Getting All Ends Here

/* ---------- */

// Getting a Single Employee
exports.findOne = (req, res) => {
	// if no employee
	try {
		Employee.findById({ _id: req.params.id })
			.select('_id email password name phone department')
			.then((employee) => {
				if (!employee) {
					return res.status(404).send({
						message: 'Employee not found with ID: ' + req.params.id,
					});
				}
				res.send(employee);
			});
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Error at Getting a Employee !',
		});
	}
}; // Getting a Single Ends Here

/* ---------- */

// Delete Here
exports.delete = async (req, res) => {
	Employee.remove({ _id: req.params.id })
		.exec()
		.then((employee) => {
			res.status(200).json({
				employee: employee,
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
				message: 'ERROR HAI IDR',
			});
		});
}; // Delete Ends Here

/* ---------- */

// Update Here
exports.update = async (req, res) => {
	return Employee.updateOne(
		{ _id: req.params.id },
		{
			$set: {
				email: req.body.email,
				name: req.body.name,
				phone: req.body.phone,
				department: req.body.department,
				role: req.body.role,
			},
		}
	).then((result) => {
		res.status(200).json({ message: 'Update Successfully !' });
	});
};
// Update Ends Here

// Update Password
exports.updatePass = async (req, res) => {
	try {
		const { employeeData } = req;
		const employee = await Employee.findOne({ email: employeeData.email });
		const found = await bcrypt.compare(req.body.oldPassword, employee.password);
		if (found) {
			const newHash = await bcrypt.hash(req.body.newPassword, 10);
			employee.password = newHash;
			await employee.save();
			res.status(200).json({ message: 'Password Update Successfully !' });
		} else {
			return res.status(401).json({
				message: 'Error at Updating Password !' || error,
			});
		}
	} catch (error) {
		return res.status(401).json({
			message: 'Error at Updating Passwordddd !' || error,
		});
	}
};
// Update Ends Here
