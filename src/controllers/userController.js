const usersDB = require("../data/users.json");
const {validationResult} = require('express-validator');

const userController ={
    register: (req, res) => {
        res.render('./users/register', { title: "Registro" })
    },
    login: (req, res) => {
        res.render('./users/login', { title: "Login" })
    },
    editUser: (req, res) => {
        res.render('./users/editUser', { title: "Editar Usuario" })
    },
    registerProcess: (req, res) => {
        /* Insertar lógica para el POST acá */

        let errores = validationResult(req);

        if (errores.isEmpty()) {
            /* res.send provisorio */
            res.send(req.body)
        } else {
            res.render('./users/register', {errors: errores.mapped(), old: req.body})
        }
    }
}

module.exports = userController