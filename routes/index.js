const express = require('express');
const router = express();

const employeeRoutes = require('./employee.routes');
const departmentRoutes = require('./department.routes');
const roleRoutes = require('./role.routes');
const salaryRoutes = require('./salary.routes');
const qualificationRoutes = require('./qualification.routes');
const leaveRoutes = require('./leave.routes');
const payrollRoutes = require('./payroll.routes');

// Employee Routes
router.use('/employee', employeeRoutes);

// Department Routes
router.use('/department', departmentRoutes);

// Role Routes
router.use('/role', roleRoutes);

// Role Routes
router.use('/salary', salaryRoutes);

// Role Routes
router.use('/qualification', qualificationRoutes);

// Role Routes
router.use('/leave', leaveRoutes);

// Role Routes
router.use('/payroll', payrollRoutes);

module.exports = router;
