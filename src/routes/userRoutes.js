const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userIconsUpload = require('../middlewares/userMulterMiddleware');
const validaciones = require('../middlewares/validatorMiddleware');
const validacionesMiddleware = require('../middlewares/validatorMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/login', guestMiddleware, userController.login)

router.post('/login', validaciones, userController.loginProcess)

router.get('/register', guestMiddleware, userController.register)

router.post('/register', userIconsUpload.single('avatar') ,validacionesMiddleware, userController.registerProcess);

router.get('/userProfile', authMiddleware, userController.profile);

router.get('/editUser', userController.editUser);

router.get('/logout', userController.logout);

module.exports = router