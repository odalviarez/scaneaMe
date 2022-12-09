const express = require('express')
const cors = require('cors')
const router = express.Router()
const productControl = require('../controllers/productsController')
const ordersControl = require("../controllers/ordersController");
const userControl = require('../controllers/usersController')
const stripe = require('../controllers/stripe')
const putProduct = require("../controllers/productsController");
const deletedProduct = require('../controllers/productsController');
require("dotenv").config();

router.use((req, res, next) => {
  if (req.originalUrl === "/stripe/webhook") {
    next(); // Si la peticion viene en la siguiente uri no parsea el body
  } else {
    express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000})
    express.json({ limit: "10mb", extended: true })(req, res, next);
  }
});


router.use(cors())

router.use('/products', productControl)
router.use("/order", ordersControl);
router.use('/user', userControl)
router.use('/stripe', stripe)
router.put("/:id", putProduct);
router.delete("/:id", deletedProduct);

module.exports = router
