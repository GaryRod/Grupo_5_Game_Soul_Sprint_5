const {body} = require('express-validator');

const validaciones = [
    body('nombre')
        .notEmpty().withMessage("Debes completar con un nombre").bail(),
    body('email')
        .isEmail().withMessage("Debes ingresar un email válido"),
    body('contraseña')
        .notEmpty().withMessage("Debes escribir una contraseña")
        .isLength({min: 8}).withMessage("Debes escribir una contraseña de 8 o más caracteres")
]

module.exports = validaciones;