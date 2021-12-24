const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const DepartmentSchema = mongoose.Schema(
	{
		dept_id: mongoose.Types.ObjectId,
		job_dept: String,
		name: String,
		description: String,
		salary_range: String,
		employee: { type: mongoose.Types.ObjectId, ref: 'employees' }, // OLD ONES
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('departments', DepartmentSchema);
