const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const DepartmentSchema = mongoose.Schema(
	{
		dept_id: mongoose.Types.ObjectId,
		job_dept: String,
		name: String,
		description: String,
		salary_range: String,
		salary: { type: mongoose.Types.ObjectId, ref: 'salaries' },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('departments', DepartmentSchema);
