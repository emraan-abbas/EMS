const express = require('express');
const router = express.Router();

const department = require('../controllers/department.controller');
const check = require('../middleware/check.middleware');

router.post('/', check, department.create);

module.exports = router;
