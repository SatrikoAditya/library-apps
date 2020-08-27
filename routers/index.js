const express = require('express')
const router = express.Router()

const Controller = require('../controllers/homeControllers');

const adminRouter = require('./adminRouter')
const userRouter = require('./userRouter')

router.get('/webmaster/add/admin/new', Controller.registerAdminForm)
router.post('/webmaster/add/admin/new', Controller.registerAdminPost)

router.get('/', Controller.home);

router.use('/user', userRouter);
router.use('/admin', adminRouter);

module.exports = router;