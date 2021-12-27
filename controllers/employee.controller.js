const Employee = require('../models/employee.model');
const Role = require('../models/role.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authSignUp, authLogin } = require('../validations/employee.validate');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

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
							fname: req.body.fname,
							lname: req.body.lname,
							gender: req.body.gender,
							age: req.body.age,
							phone: req.body.phone,
							email: req.body.email,
							password: hash,
							department: req.body.department,
							role: req.body.role,
							payroll: req.body.payroll,
							leave: req.body.leave,
							qualification: req.body.qualification,
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
		payroll: req.body.payroll,
		leave: req.body.leave,
		qualification: req.body.qualification,
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
		.select(
			'_id email password fname lname gender age phone department role leave qualification payroll'
		)
		.populate('department', '_id name description')
		.populate('role', '_id name description')
		.populate('leave', 'date reason')
		.populate('qualification', 'position requirements date_in')
		.populate('payroll', 'date report total_amount')

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
			.select('_id email password fname lname gender age phone department leave qualification')
			.populate('department', '_id name description')
			.populate('role', '_id name description')
			.populate('leave', 'date reason')
			.populate('qualification', 'position requirements date_in')
			.populate('payroll', 'date report total_amount')
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
				fname: req.body.fname,
				lname: req.body.lname,
				gender: req.body.gender,
				age: req.body.age,
				phone: req.body.phone,
				email: req.body.email,
				department: req.body.department,
				role: req.body.role,
				payroll: req.body.payroll,
				leave: req.body.leave,
				qualification: req.body.qualification,
			},
		}
	).then((result) => {
		res.status(200).json({ message: 'Update Successfully !' });
	});
};
// Update Ends Here

/* ---------- */

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

/* ---------- */

// Forget Passowrd
exports.forgetPass = async (req, res) => {
	const email = req.body.email; //not part of Node Mailer

	// EMAIL CHECK
	Employee.findOne({ email }, function (err, data) {
		if (data) {
			//JWT token for registration
			const token = jwt.sign({ email }, 'password123', {
				expiresIn: '30m',
			});
			// NODE MAILER
			let transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: process.env.EMAIL,
					pass: process.env.PASSWORD,
				},
			});

			let mailOptions = {
				from: '"Employee Management System" mrbuilder0@gmail.com',
				to: email,
				subject: 'Activation Token for your Forgotten Password',
				html: `
				<h2> Your Activation Link </h2>
				<p> token= ${token} </p>
				`,
			};

			transporter.sendMail(mailOptions, (err, data) => {
				if (err) {
					return res.status(401).json({
						message: 'Error at Nodemailer !' || error,
					});
				} else {
					return res.status(200).json({
						message: 'Email Sent (Nodemailer) !' || error,
					});
				}
			});
		} else {
			console.log('EMAIL NOT FOUND');
			return res.status(401).json({
				message: 'No Such Email Found !' || error,
			});
		}
	});
};
// Forget Passowrd Ends Here

/* ---------- */

// Verify Password
exports.verifyPass = async (req, res) => {
	const { token } = req.body;
	if (token) {
		jwt.verify(token, 'password123', async function (err, decodedToken) {
			if (err) {
				console.log(err);
				return res.status(400).json({ error: 'Incorrect or Expired Link !' });
			} else {
				const { email } = decodedToken;
				//Update Password //
				const employee = await Employee.findOne({ email });
				const newHash = await bcrypt.hash(req.body.password, 10);
				employee.password = newHash;
				console.log(employee);
				await employee.save();
				res.status(200).json({ message: 'New Password Set Successfully !' });
				//Update Password //
			}
		});
	} else {
		return res.status(400).json({ error: 'Error at Verify Token !' });
	}
};
// Verify Password Ends Here
