const express = require('express');
const router = express.Router();

const employee = require('../controllers/employee.controller');

router.post('/signup', employee.signUp);
router.post('/login', employee.logIn);
router.post('/', employee.create);
router.get('/', employee.findAll);
router.get('/:id', employee.findOne);
router.delete('/:id', employee.delete);

module.exports = router;
