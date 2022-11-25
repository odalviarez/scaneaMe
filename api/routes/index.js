const express = require("express");
const { Router } = require("express");
const cors = require("cors");
const router = express.Router();
const productControl = require("../controllers/productsController");
const ordersControl = require("../controllers/ordersController");
const loginControl = require("../controllers/loginController");
const registerControl = require("./register")

const server = express();
// const router = Router();

router.use(express.json());
router.use(cors())

router.use("/products", productControl);
router.use("/order", ordersControl);
router.use("/login", loginControl);
router.use("/register", registerControl);

module.exports = router;
