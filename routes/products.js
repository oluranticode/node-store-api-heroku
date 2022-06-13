
    const express = require('express');
    const router = express.Router();
    // import controllers
    const { getAllProductsStatic, getAllProducts, createProduct } = require('../controllers/products');
    const {getAllProductsSort} = require('../controllers/products_sort');

    router.route('/').get(getAllProducts).post(createProduct);
    router.route('/static').get(getAllProductsStatic);
    router.route('/sort-all').get(getAllProductsSort);

    module.exports = router