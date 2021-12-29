const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const SalarySchema = mongoose.Schema(
	{
		salary_id: mongoose.Types.ObjectId,
		amount: String,
		annual: String,
		bonus: String,
		employeeId: { type: mongoose.Types.ObjectId, ref: 'employees' },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('salaries', SalarySchema);
