const jwt = require('jsonwebtoken');

// Authenticated Routes
module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.employeeData = decoded;
		next();
	} catch (error) {
		return res.status(401).json({
			message: 'Not Authenticated for this route !',
		});
	}
};

// Authenticated Roles
const authRole = (role) => {
	return (req, res, next) => {
		const userRole = req.body.role;
		console.log(userRole);
		if (role.includes(userRole)) {
			next();
		} else {
			return res.status(401).json("You don't have permission !");
		}
	};
};

module.exports = { authRole };
