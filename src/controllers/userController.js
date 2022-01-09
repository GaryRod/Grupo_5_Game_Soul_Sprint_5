const usersDB = require("../data/users.json");

const userController ={
    register: (req, res) => {
        res.render('./users/register', { title: "Registro" })
    },
    login: (req, res) => {
        res.render('./users/login', { title: "Login" })
    },
    editUser: (req, res) => {
        res.render('./users/editUser', { title: "Editar Usuario" })
    }
}

module.exports = userController