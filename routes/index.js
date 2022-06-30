const express = require('express');
const managerController = require('../controllers/productsControllers');

const router = express.Router();

router.get('/products', managerController.getAll);
router.post('/products', managerController.add);
router.get('/products/:id', managerController.getById);

module.exports = router;