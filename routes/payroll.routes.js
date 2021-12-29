const express = require('express');
const router = express.Router();

const payroll = require('../controllers/payroll.controller');
const check = require('../middleware/check.middleware');
const { authRole } = require('../middleware/roleCheck.middleware');

router.post('/', payroll.create);
router.get('/', payroll.findAll);
router.get('/:id', payroll.findOne);

module.exports = router;
