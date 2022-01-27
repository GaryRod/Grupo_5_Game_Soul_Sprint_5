const express = require("express");
const app = express();
const path = require('path');
const session = require('express-session');
const cookies = require('cookie-parser')

const mainRoutes = require('./routes/mainRoutes')
const productsRoutes = require('./routes/productsRoutes')
const userRoutes = require('./routes/userRoutes')
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')

// Sessiones y Cookies
app.use(session({
    secret: "No deberías estar leyendo esto!",
    resave: false,
    saveUninitialized: false
}));

app.use(cookies())

// User logged
app.use(userLoggedMiddleware)

app.use(session({
    secret: "No deberías estar leyendo esto!",
    resave: false,
    saveUninitialized: false
}));
// Archivos estáticos
app.use(express.static('public'));

// Requerimientos para templates
app.set('view engine', 'ejs')
app.set("views", path.resolve(__dirname, "./views"))

// Requerimientos para formularios
const methodOverride =  require('method-override'); 
const { cookie } = require("express/lib/response");
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// Rutas
app.use('/', mainRoutes)
app.use('/products', productsRoutes)
app.use('/users', userRoutes)

// Error 404
app.use((req, res, next)=>{
    res.status(404).render(path.resolve(__dirname,'views/products/not-found'))
})

const port = 3030

app.listen(process.env.PORT || port, () => { 
    console.log(`Servidor funcionando ${port}`)
});