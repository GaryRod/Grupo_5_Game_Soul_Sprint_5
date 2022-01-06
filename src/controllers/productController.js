const jsonDB = require('../model/jsonDatabase');
const productModel = jsonDB('products');

const products = require('../data/products')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productController = {
    products: (req, res) => {
		let producto = productModel.all();
        res.render('./products/products', {producto})
    },
    productDetail: (req, res) => {
		let producto = productModel.find(req.params.id)
		res.render('./products/productDetail', {producto})
    },
	productCart: (req,res) => {
		res.render('./products/productCart')
	},
	createProduct: (req, res) => {
		res.render('./products/createProduct')
	},
    store: (req, res) => {
		let grupo = req.body
		grupo.imagen = req.file.filename
		let nuevoJuego = {
			nombre : req.body.nombre,
			descripcion : req.body.descripcion,
			precio : req.body.precio,
			edicion : req.body.edicion,      
			img: grupo.imagen,
			genero: req.body.genero,
			categoria : req.body.categoria
		}
		productModel.create(nuevoJuego)
		res.redirect('/')
	},
	editProduct: (req, res) => {
		let productToEdit = productModel.find(req.params.id)
		res.render('./products/editProduct', {productToEdit})
	},
    update: (req, res) => {
		let productToUpdate = productModel.find(req.params.id)
		let grupo = req.body
		grupo.imagen = req.file.filename
		let objetoAct ={
			id : productToUpdate.id,
			nombre : req.body.nombre,
			descripcion : req.body.descripcion,
			precio : req.body.precio,
			edicion : req.body.edicion,      
			img: grupo.imagen,
			genero: req.body.genero,
			categoria : req.body.categoria
        }
		productModel.update(objetoAct)
		res.redirect('/')
			
	},
    destroy: (req, res) => {
		productModel.delete(req.params.id)
		res.redirect('/')	
	},
}

module.exports = productController