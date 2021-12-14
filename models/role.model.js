const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const RoleSchema = mongoose.Schema(
	{
		name: String,
		description: String,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('roles', RoleSchema);
