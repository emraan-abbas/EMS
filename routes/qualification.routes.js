const express = require('express');
const router = express.Router();

const qualification = require('../controllers/qualification.controller');
const check = require('../middleware/check.middleware');
const { authRole } = require('../middleware/roleCheck.middleware');

router.post('/', qualification.create);
router.get('/', qualification.findAll);
router.get('/:id', qualification.findOne);

module.exports = router;
