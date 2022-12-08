const express = require('express')
const { Router } = require('express')
const cors = require('cors')
const router = express.Router()
const productControl = require('../controllers/productsController')
//const ordersControl = require("../controllers/ordersController");
const userControl = require('../controllers/usersController')
const stripe = require('../controllers/stripe')
const deletedProduct = require('../controllers/productsController');
const putProduct = require("../controllers/productsController");

const server = express()
// const router = Router();

router.use((req, res, next) => {
  if (req.originalUrl === "/stripe/webhook") {
    next(); // Do nothing with the body because I need it in a raw state.
  } else {
    express.json()(req, res, next); // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
  }
});


//router.use(express.json())
router.use(cors())

router.use('/products', productControl)
//router.use("/order", ordersControl);
router.use('/user', userControl)
router.use('/stripe', stripe)
router.put("/:id", putProduct);
router.delete("/:id", deletedProduct);

module.exports = router
