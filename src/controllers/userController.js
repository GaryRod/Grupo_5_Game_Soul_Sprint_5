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
        
            return res.render('./users/register',{
                errors: errores.mapped(),
                oldData: req.body
            })
        }
       
        let usuario = req.body;
        usuario.imagen = req.file.filename;
        let userToCreate = {
            ...req.body,
            contraseña: bcryptjs.hashSync(req.body.contraseña, 10),
            avatar: usuario.imagen
        }

        usersModel.create(userToCreate)

        res.redirect('./users/login')
        
    },
    loginProcess: (req,res)=>{
        let userLogin = usersModel.findField('email', req.body.email)
        if(userLogin){
            let okContraseña = bcryptjs.compareSync(req.body.contraseña, userLogin.contraseña)
            if(okContraseña){
                return  res.redirect('/')
            }
            return res.render('./users/login',{
                errors: { email: { msg: 'Contraseña incorrecta'}}
        })
        }
        return res.render('./users/login',{
            errors: { email: { msg: 'Email no registrado'}}
        })
    }
}

module.exports = userController