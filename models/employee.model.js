const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const EmployeeSchema = mongoose.Schema(
	{
		email: String,
		password: String,
		phone: Number,
		name: String,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('employees', EmployeeSchema);
