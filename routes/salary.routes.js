const express = require('express');
const router = express.Router();

const salary = require('../controllers/salary.controller');
const check = require('../middleware/check.middleware');
const { authRole } = require('../middleware/roleCheck.middleware');

router.post('/', salary.create);
router.get('/', salary.findAll);

module.exports = router;
