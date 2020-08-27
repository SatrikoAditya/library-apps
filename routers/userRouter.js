const express = require('express')
const router = express.Router()

const Controller = require('../controllers/userControllers');

function checkLogin(req, res, next ) {
    if(req.session.userId){
        next()
    } else {
        res.redirect('/')
    }
}

router.get('/login', Controller.loginForm);
router.post('/login', Controller.loginPost);

router.use(checkLogin)

router.get('/views', Controller.viewBooks);
router.get('/checkout/:bookId', Controller.checkoutForm);
router.post('/checkout/:bookId', Controller.checkoutPost);
router.get('/rented', Controller.findAllRent);
router.get('/return/:userbookId', Controller.return);
router.get('/logout', Controller.logout);

module.exports = router