const Joi = require('joi');

const authSignUp = Joi.object({
	// _id: mongoose.Types.ObjectId(),
	email: Joi.string().email().lowercase().required(),
	password: Joi.string().min(6).required(),
	fname: Joi.string().required(),
	lname: Joi.string().required(),
	gender: Joi.string().required(),
	age: Joi.string().required(),
	phone: Joi.string().required(),
	department: Joi.string().required(),
	role: Joi.string().required(),
});

const authLogin = Joi.object({
	// _id: mongoose.Types.ObjectId(),
	email: Joi.string().email().lowercase().required(),
	password: Joi.string().min(6).required(),
	role: Joi.string(),
});

module.exports = { authSignUp, authLogin };
