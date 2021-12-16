const Employee = require('../models/employee.model');
const Department = require('../models/department.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authSchema } = require('../validations/employee.validate');
const mongoose = require('mongoose');

// Employee Sign Up
exports.signUp = async (req, res) => {
	// JOI STARTS HERE
	const { error, value } = authSchema.validate(req.body); //JOI here validating
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
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(500).json({
							error: err,
						});
					} else {
						const employee = new Employee({
							email: req.body.email,
							password: hash,
						});
						employee
							.save()
							.then((result) => {
								console.log(result);
								res.status(201).json({
									message: 'User Created',
								});
							})
							.catch((err) => {
								console.log(err);
								res.status(500).json({
									error: err,
								});
							});
					}
				});
			}
		});
};
// Sign Up End Here

//Employee Log In
exports.logIn = async (req, res) => {
	// JOI STARTS HERE
	const { error, value } = authSchema.validate(req.body); //JOI here validating
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
				if (result) {
					const token = jwt.sign(
						{
							email: employee[0].email,
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
		.select('_id email password department')
		.populate('department', '_id name description')
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
