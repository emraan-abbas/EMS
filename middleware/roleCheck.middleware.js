// Authenticated Roles
const authRole = (role) => {
	return (req, res, next) => {
		const userRole = req.body.role;
		console.log(userRole);
		if (role.includes(userRole)) {
			next();
		} else {
			return res.status(401).json("You don't have permission ! (ROLE ERR)");
		}
	};
};

module.exports = { authRole };
