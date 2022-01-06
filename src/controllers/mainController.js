const jsonDB = require('../model/jsonDatabase');
const productModel = jsonDB('products');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController = {
    index: (req, res) => {
        let recomendados = productModel.buscado('recomendados');
        let masVistos = productModel.buscado('mas-vistos');
        let visitados = productModel.buscado('visited');
        res.render('./index', {masVistos, visitados, recomendados})
    },
}

module.exports = mainController