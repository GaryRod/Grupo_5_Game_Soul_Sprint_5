const jsonDB = require('../model/jsonDatabase');
const usersModel = jsonDB('users');


function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false
<<<<<<< HEAD

    let emailsInCookie = req.cookies.userEmail
    let userFromCoike = usersModel.findField('email',emailsInCookie);

    if(userFromCoike){
        req.session.userLogged = userFromCoike
    }

    if (req.session && req.session.userLogged) {
=======
    if (req.session.userLogged) {
>>>>>>> 2c09473262944ddd727df4c327d236f9cb1f9d7f
        res.locals.isLogged = true
        res.locals.userLogged = req.session.userLogged
    }

    next()
}

module.exports = userLoggedMiddleware
