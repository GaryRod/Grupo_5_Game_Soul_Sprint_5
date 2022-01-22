const express = require('express');
const router = express.Router();
// Solicito todas las funcionalidades del productController
const productController = require('../controllers/productController');
const upload = require("../middlewares/multerMiddleware");
const authMiddleware = require('../middlewares/authMiddleware');

/* Con readDetail - LEE PRODUCTO SEGUN ID */
router.get('/', productController.products)

router.get('/detail/:id', productController.productDetail);

router.get('/productCart', authMiddleware, productController.productCart);

router.get('/create', productController.createProduct);
router.post('/create', upload.single("imagen"), productController.store);

router.get('/:id/edit', productController.editProduct);
router.put('/:id/edit', upload.single("imagen"), productController.update);

router.delete('/delete/:id', productController.destroy)

router.get('/favoritos',productController.favoritos)

// router.get('/search', productController.search);

module.exports = router