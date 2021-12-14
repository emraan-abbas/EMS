const express = require('express');
const router = express.Router();

const department = require('../controllers/department.controller');
const check = require('../middleware/check.middleware');
const { authRole } = require('../middleware/check.middleware');

router.post('/', department.create);
router.get('/', authRole(['admin']), department.findAll);

module.exports = router;
