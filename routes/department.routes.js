const express = require('express');
const router = express.Router();

const department = require('../controllers/department.controller');
const check = require('../middleware/check.middleware');
const { authRole } = require('../middleware/roleCheck.middleware');

router.post('/', check, authRole(['admin']), department.create);
router.get('/', check, authRole(['admin']), department.findAll);

module.exports = router;
