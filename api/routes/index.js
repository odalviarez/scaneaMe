const express = require("express");
const { Router } = require("express");
const cors = require("cors");
const router = express.Router();
const productControl = require("../controllers/productsController");
const loginControl = require("../controllers/loginController");


const server = express();
// const router = Router();

router.use(express.json());
router.use(cors())

router.use("/products", productControl);
//router.use("/order", ordersControl);
router.use("/login", loginControl);


module.exports = router;
