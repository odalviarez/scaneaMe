const express = require('express')
const { Router } = require('express')
const cors = require('cors')
const router = express.Router()
const productControl = require('../controllers/productsController')
//const ordersControl = require("../controllers/ordersController");
const userControl = require('../controllers/usersController')
const stripe = require('../controllers/stripe')

const server = express()
// const router = Router();

router.use(express.json())
router.use(cors())

router.use('/products', productControl)
//router.use("/order", ordersControl);
router.use('/user', userControl)
router.use('/stripe', stripe)

module.exports = router
