const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema(
	{
		_id: mongoose.Types.ObjectId,
		email: String,
		password: String,
		name: String,
		phone: String,
		department: { type: mongoose.Types.ObjectId, ref: 'departments' },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('employees', EmployeeSchema);
