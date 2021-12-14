const express = require('express');
const router = express.Router();

const employee = require('../controllers/employee.controller');

router.post('/', employee.create);
router.get('/', employee.findAll);
router.get('/:id', employee.findOne);
router.post('/signup', employee.signUp);
router.post('/login', employee.logIn);
// router.post('/login', userController.login);
// router.post('/email-verify', userController.verifyAccount);
// router.get('/authentication/activate', userController.activate_User);

module.exports = router;
