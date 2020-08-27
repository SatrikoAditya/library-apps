const express = require('express')
const router = express.Router()

const AdminControllers = require('../controllers/adminControllers')

router.get('/')
router.get('/list-books', AdminControllers.show)
router.get('/book/add', AdminControllers.addForm)
router.post('/book/add', AdminControllers.addPost)
router.get('/delete-book/:id', AdminControllers.delete)
router.get('/book/edit/:id', AdminControllers.editForm)
router.post('/book/edit/:id', AdminControllers.editPost)

module.exports = router