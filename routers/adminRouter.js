const express = require('express')
const router = express.Router()

const AdminControllers = require('../controllers/adminControllers')

router.get('/login', AdminControllers.loginForm)
router.post('/login', AdminControllers.loginPost)

function checkLogin(req, res, next ) {
    if(req.session.adminId){
        next()
    } else {
        res.redirect('admin/login')
    }
}

router.use(checkLogin)

router.get('/')
router.get('/list-books',  AdminControllers.show)
router.get('/book/add', AdminControllers.addForm)
router.post('/book/add', AdminControllers.addPost)
router.get('/delete-book/:id', AdminControllers.delete)
router.get('/book/edit/:id', AdminControllers.editForm)
router.post('/book/edit/:id', AdminControllers.editPost)
router.get('/register/user', AdminControllers.registerForm)
router.post('/register/user', AdminControllers.registerPost)
router.get('/list-users', AdminControllers.listUser)
router.get('/delete/user/:id', AdminControllers.deleteUser)
router.get('/books/rented', AdminControllers.listRentBook)
router.get('/books/pending')
router.get('/logout', AdminControllers.logout)

module.exports = router