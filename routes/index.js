const express = require('express');
const managerController = require('../controllers/managerController');

const router = express.Router();

router.get('/products', managerController.getAll);
router.get('/products/:id', managerController.getById);

module.exports = router;