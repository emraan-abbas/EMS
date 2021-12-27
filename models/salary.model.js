const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const SalarySchema = mongoose.Schema(
	{
		salary_id: mongoose.Types.ObjectId,
		amount: String,
		anual: String,
		bonus: String,
		payroll: { type: mongoose.Types.ObjectId, ref: 'payrolls' },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('salaries', SalarySchema);
