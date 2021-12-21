const express = require('express');
const router = express.Router();

const employee = require('../controllers/employee.controller');
const check = require('../middleware/check.middleware');
const { authRole } = require('../middleware/roleCheck.middleware');

router.post('/signup', employee.signUp); // check, authRole(['admin']),
router.post('/login', employee.logIn);
router.post('/', check, authRole(['admin']), employee.create);
router.get('/', check, employee.findAll);
router.get('/:id', check, authRole(['admin']), employee.findOne);
router.delete('/:id', check, authRole(['admin']), employee.delete);
router.put('/:id', employee.update);
router.patch('/:id', check, employee.updatePass);

module.exports = router;
