const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const QualificationSchema = mongoose.Schema(
	{
		_id: mongoose.Types.ObjectId,
		position: String,
		requirements: String,
		date_in: String,
		employee: { type: mongoose.Types.ObjectId, ref: 'employees' },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('qualifications', QualificationSchema);
