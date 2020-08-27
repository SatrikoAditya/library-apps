const express = require('express')
const router = express.Router()

const Controller = require('../controllers/homeControllers');

const adminRouter = require('./adminRouter')
const userRouter = require('./userRouter')

router.get('/', Controller.home);

router.use('/user', userRouter);
router.use('/admin', adminRouter);

module.exports = router;