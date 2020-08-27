const express = require('express')
const router = express.Router()

const Controller = require('../controllers/userControllers');

router.get('/views', Controller.viewBooks);
router.get('/login', Controller.loginForm);
router.post('/login', Controller.loginPost);
router.get('/checkout/:bookId', Controller.checkoutForm);
router.post('/checkout/:bookId', Controller.checkoutPost);
router.get('/rented', Controller.findAllRent);
router.post('/return/:userbookId', Controller.return);

module.exports = router