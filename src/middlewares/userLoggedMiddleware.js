const jsonDB = require('../model/jsonDatabase');
const userModel = jsonDB('users');


function userLoggedMiiddleware(res,req,next){
    req.locals.isLogged = false;

    let emailsInCookie = res.cookies.userMail
    let userFromCoike = userModel.findByField('email',emailsInCookie);

    if(userFromCoike){
        res.session.userLogged = userFromCoike
    }


    if(res.session.userLogged){
        req.locals.isLogged = true;
        req.locals.userLogged = res.session.userLogged
    }
    next();
}
module.exports=userLoggedMiiddleware