const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const usuariosSubida = require('../middlewares/multerMiddleware');
const validacionesMiddleware = require('../middlewares/validatorMiddleware');

router.get('/login', userController.login)

router.get('/register', userController.register)

router.get('/editUser', userController.editUser);

router.post('/register', validacionesMiddleware, userController.registerProcess);

module.exports = router