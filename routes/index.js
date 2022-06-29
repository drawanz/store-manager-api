const router = require('express').Router();
const managerController = require('../controllers/managerController');

router.get('/products', managerController.getAll());
router.get('products/:id', managerController.getById());

module.exports = router;