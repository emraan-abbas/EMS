const express = require('express');
const router = express.Router();

const role = require('../controllers/role.controller');
const check = require('../middleware/check.middleware');
const { authRole } = require('../middleware/roleCheck.middleware');

router.post('/', role.create);
router.get('/', role.findAll);

module.exports = router;
