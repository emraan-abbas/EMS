const Employee = require('../models/employee.model');
const Role = require('../controllers/role.controller');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Employee Sign Up
exports.signUp = async (req, res) => {
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

	try {
		const obj = req.body;
		const employee = await Employee.create(obj);
		res.send(employee);
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Error at creating Employee !',
		});
	}
}; // Create Ends Here

/* ---------- */

// Getting All Employees
exports.findAll = async (req, res) => {
	try {
		await Employee.find().then((employee) => {
			res.status(200).json({
				status: true,
				data: employee,
			});
		});
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Error at Getting All Employee !',
		});
	}
}; // Getting All Ends Here

/* ---------- */

// Getting a Single Employee
exports.findOne = async (req, res) => {
	try {
		await Employee.findById({ id: req.params._id }).then((employee) => {
			if (!employee) {
				return res.status(404).send({
					message: 'Employee not found with ID: ' + req.params._id,
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
