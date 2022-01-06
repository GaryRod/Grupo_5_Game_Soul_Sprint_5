const usersDB = require("../data/users.json");

const userController ={
    register: (req, res) => {
        res.render('./users/register', { title: "Registro" })
    },
    login: (req, res) => {
        res.render('./users/login', { title: "Login" })
    },
}

module.exports = userController