const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const SalarySchema = mongoose.Schema(
	{
		salary_id: mongoose.Types.ObjectId,
		amount: String,
		anual: String,
		bonus: String,
		department: { type: mongoose.Types.ObjectId, ref: 'departments' },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('salaries', SalarySchema);
