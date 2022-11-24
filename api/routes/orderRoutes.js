const express = require('express');
//const router = express.Router();
const orderControl = require("../controllers/ordersController");
const server = express();

server.use("/order", orderControl);


module.exports = server;