const Payroll = require('../models/payroll.model');
const Leave = require('../models/leave.model');
const Employee = require('../models/employee.model');

const mongoose = require('mongoose');

// Creating Payrolls
exports.create = async (req, res) => {
	// Validating Role
	if (!req.body) {
		return res.status(400).send({
			message: 'Please Enter Some Data !',
		});
	}

	const employee = await Employee.findById(req.body.employeeId).populate('department');
	// console.log(employee.department.salary, 'Salary');
	// console.log(employee.department._id, 'Dept');

	const payroll = new Payroll({
		payroll_id: mongoose.Types.ObjectId(),
		date: req.body.date,
		report: req.body.report,
		total_amount: req.body.total_amount,
		employeeId: req.body.employeeId,
		salary: employee.department.salary,
	});
	payroll
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

// Getting All Payrolls
exports.findAll = async (req, res) => {
	try {
		await Payroll.find().then((payroll) => {
			res.status(200).json({
				status: true,
				data: payroll,
			});
		});
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Error at Getting All Leaves !',
		});
	}
}; // Getting All Ends Here

/* ---------- */

// Getting a Single
exports.findOne = async (req, res) => {
	try {
		const payroll = await Payroll.find({ employeeId: req.params.id }) //, date:req.body.date
			.select('_id date report total_amount employeeId salary')
			.populate('salary', '_id salary_id amount bonus');

		const leaves = await Leave.find({ employeeId: req.params.id }).select(
			'_id salary_id amount bonus date reason'
		);
		return res.send({ payrollDetails: payroll, leavesDetail: leaves });
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Error at Getting a Salary !',
		});
	}
};

//------------------------------------
// Getting a Single Payroll
// exports.findOne = (req, res) => {
// 	// 	 if no Payroll
// 	try {
// 		Payroll.find({ employeeId: req.params.id })
// 			.select('_id date report total_amount employeeId salary leave')
// 			.populate('salary leave', 'id')
// 			.then((payroll) => {
// 				if (!req.body) {
// 					return res.status(404).send({
// 						message: 'Write something bro !: ',
// 					});
// 				}
// 				res.send(payroll);
// 			});
// 	} catch (error) {
// 		res.status(500).send({
// 			message: error.message || 'Error at Getting a Salary !',
// 		});
// 	}
// }; // Getting a Single Ends Here

/* ---------- */
