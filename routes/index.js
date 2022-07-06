const express = require('express');
const productsControllers = require('../controllers/productsControllers');
const salesController = require('../controllers/salesControllers');

const router = express.Router();

router.get('/products/search', productsControllers.searchProduct);
router.get('/products', productsControllers.getAll);
router.post('/products', productsControllers.add);
router.get('/products/:id', productsControllers.getById);
router.put('/products/:id', productsControllers.att);
router.delete('/products/:id', productsControllers.deleteProduct);

router.get('/sales', salesController.findAllSales);
router.get('/sales/:id', salesController.findSaleById);
router.delete('/sales/:id', salesController.deleteSale);
router.put('/sales/:id', salesController.attSale);
router.post('/sales', salesController.registrySales);

module.exports = router;