const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs')
const jsonDB = require('../model/jsonDatabase');
const usersModel = jsonDB('users');

const userController ={
    register: (req, res) => {
        res.render('./users/register')
    },
    login: (req, res) => {
        res.render('./users/login')
    },
    editUser: (req, res) => {
        res.render('./users/editUser')
    },
    registerProcess: (req, res) => {
        /* Insertar lógica para el POST acá */

        const errores = validationResult(req);
        
        if (errores.errors.length > 0 ) {
        
            return res.render('./register',{
                errors: errores.mapped(),
                oldData: req.body
            })
        }
       
        let userToCreate = {
            ...req.body,
            contraseña: bcryptjs.hashSync(req.body.contraseña, 10),
            avatar: req.file.filename
        }

        usersModel.create(userToCreate)

        res.redirect('/')
        
    },
    loginProcess: (req,res)=>{
        let usuarioLogin = usersModel.findField('email', req.body.email);

        if (usuarioLogin) {
            let contraseniaOk = bcryptjs.compareSync(req.body.contrasenia-login, usuarioLogin.contraseña)
            if (contraseniaOk) {
                delete usuarioLogin.contraseña;
                req.session.usuarioLogeado = usuarioLogin;
                res.redirect('/');
            }

            return res.render('./users/login', {
                errors: {
                    email: 'La contraseña es incorrecta!'
                }
            })
        }

        return res.render('./users/login', {
            errors: {
                email: 'Este email no está registrado!'
            }
        })
    },
    profile: (req, res) => {
        return res.render('./users/userProfile')
    }
}

module.exports = userController