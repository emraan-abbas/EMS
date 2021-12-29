const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const PayrollSchema = mongoose.Schema(
	{
		payroll_id: mongoose.Types.ObjectId,
		date: String,
		report: String,
		total_amount: String,
		employeeId: { type: mongoose.Types.ObjectId, ref: 'employees' },
		salary: { type: mongoose.Types.ObjectId, ref: 'salaries' },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('payrolls', PayrollSchema);
