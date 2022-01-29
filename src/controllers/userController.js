const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs')
const jsonDB = require('../model/jsonDatabase');
const req = require('express/lib/request');
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
            return res.render('./users/register',{
                errors: errores.mapped(),
                oldData: req.body
            })
        }

        let userInDB = usersModel.findField('email', req.body.email)

        if (userInDB) {
            return res.render('./users/register',{
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            })
        }

        let userToCreate = {
            ...req.body,
            contraseña: bcryptjs.hashSync(req.body.contraseña, 10),
            isAdmin: String(req.body.email).includes('@gamesoul.com')
        }

        if (req.file) {
            userToCreate.avatar = req.file.filename
        } else {
            userToCreate.avatar = 'default.png'
        }

        usersModel.create(userToCreate)

        res.redirect('/users/login')
    },
    loginProcess: (req,res)=>{
        const errores = validationResult(req);
        
        if (errores.errors.length > 0 ) {
            return res.render('./users/login',{
                errors: errores.mapped(),
                oldData: req.body
            })
        }

        let userToLogin = usersModel.findField ('email', req.body.email)

        if(userToLogin){
            let isOkThePasword = bcryptjs.compareSync(req.body.contraseña, userToLogin.contraseña)
            if(isOkThePasword){
                delete userToLogin.contraseña
                req.session.userLogged = userToLogin

                if(req.body.recuerdame){
                    res.cookie('userEmail',req.body.email,{maxAge:(1000*60)})
                }

                return res.redirect('./userProfile')
            }
            return res.render('./users/login',{
                errors: { 
                    contraseña: { msg: 'La contraseña no es válida'},
                },
                oldData: req.body
            })
        }

        return res.render('./users/login',{
            errors: { 
                email: { msg: 'Por favor, ingresá un email válido'},
            },
        })
    },
    profile: (req,res) => {
        res.render('./users/userProfile', {
            user: req.session.userLogged
        })
    },
    logout: (req, res) => {
        res.clearCookie('userEmail')
        req.session.destroy()
        return res.redirect('/')
    }
}

module.exports = userController