const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const EmployeeSchema = mongoose.Schema(
	{
		email: String,
		password: String,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('employees', EmployeeSchema);
