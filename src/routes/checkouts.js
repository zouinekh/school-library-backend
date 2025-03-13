const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

router.get('/', checkoutController.getCheckouts);
router.put('/', checkoutController.addCheckout);
router.patch('/:id', checkoutController.returnCheckout);
router.get('/book/:bookId', checkoutController.getCheckoutsByBookId);
module.exports = router;