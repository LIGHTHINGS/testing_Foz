const express = require('express');
const router = express.Router();
const ProductController = require('../Controller/controllers');



//Admin route ========
router.get('/admin/products', ProductController.getAllProduct);

router.get('/admin/products/:id', ProductController.getProductById);

router.post('/admin/products', ProductController.postNewProduct);

router.delete('/admin/products/:id', ProductController.deleteProductById);

module.exports = router;

