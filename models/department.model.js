const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const DepartmentSchema = mongoose.Schema(
	{
		name: String,
		description: String,
		employee: { type: mongoose.Types.ObjectId, ref: 'employees' },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('departments', DepartmentSchema);
