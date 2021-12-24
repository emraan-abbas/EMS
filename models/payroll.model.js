const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const PayrollSchema = mongoose.Schema(
	{
		payroll_id: mongoose.Types.ObjectId,
		date: String,
		report: String,
		total_amount: String,
		employee: { type: mongoose.Types.ObjectId, ref: 'employees' },
		department: { type: mongoose.Types.ObjectId, ref: 'departments' },
		salary: { type: mongoose.Types.ObjectId, ref: 'salaries' },
		leave: { type: mongoose.Types.ObjectId, ref: 'leaves' },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('payrolls', PayrollSchema);
