const {body} = require('express-validator');
const validaciones = [
    body('email')
        .notEmpty().withMessage("Debes completar con un email")
        .isEmail().withMessage("Debes ingresar un email válido"),
    body('contraseña')
        .notEmpty().withMessage("Debes escribir una contraseña")
]

module.exports = validaciones;