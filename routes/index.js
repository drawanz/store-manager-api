const express = require('express');
const productsControllers = require('../controllers/productsControllers');
const salesController = require('../controllers/salesControllers');

const router = express.Router();

router.get('/products', productsControllers.getAll);
router.post('/products', productsControllers.add);
router.get('/products/:id', productsControllers.getById);
router.post('/sales', salesController.registrySales);

module.exports = router;