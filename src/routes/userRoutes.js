const express = require('express');
const router = express.Router();
const multer = require('multer')
const userController = require('../controllers/userController');
const userIconsUpload = require('../middlewares/userMulterMiddleware');
const validaciones = require('../middlewares/validatorMiddleware');
const validacionesMiddleware = require('../middlewares/validatorMiddleware');

router.get('/login', userController.login)

router.get('/userProfile', userController.profile);

router.get('/register', userController.register)

router.get('/editUser', userController.editUser);

router.post('/register', userIconsUpload.single('avatar') ,validacionesMiddleware, userController.registerProcess);

router.post('/login',validaciones, userController.loginProcess)

module.exports = router