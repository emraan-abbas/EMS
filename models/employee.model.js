const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema(
	{
		emp_id: mongoose.Types.ObjectId,
		fname: String,
		lname: String,
		gender: String,
		age: String,
		phone: String,
		email: String,
		password: String,
		department: { type: mongoose.Types.ObjectId, ref: 'departments' }, // OLD ONES
		role: { type: mongoose.Types.ObjectId, ref: 'roles' }, // OLD ONES
		payroll: { type: mongoose.Types.ObjectId, ref: 'payrolls' },
		leave: { type: mongoose.Types.ObjectId, ref: 'leaves' },
		qualification: { type: mongoose.Types.ObjectId, ref: 'qualifications' },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('employees', EmployeeSchema);
