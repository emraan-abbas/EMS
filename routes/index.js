const express = require('express');
const router = express();

const employeeRoutes = require('./employee.routes');
const departmentRoutes = require('./department.routes');
const roleRoutes = require('.//role.routes');

// Employee Routes
router.use('/employee', employeeRoutes);

// Department Routes
router.use('/department', departmentRoutes);

// Role Routes
router.use('/role', roleRoutes);

module.exports = router;
