const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const LeaveSchema = mongoose.Schema(
	{
		leave_id: mongoose.Types.ObjectId,
		date: String,
		reason: String,
		employeeId: { type: mongoose.Types.ObjectId, ref: 'employees' },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('leaves', LeaveSchema);
