const express = require('express');
const router = express.Router();

const leave = require('../controllers/leave.controller');
const check = require('../middleware/check.middleware');
const { authRole } = require('../middleware/roleCheck.middleware');

router.post('/', leave.create);
router.get('/', leave.findAll);
router.get('/:id', leave.findOne);

module.exports = router;
