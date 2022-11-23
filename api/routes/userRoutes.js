const express = require('express');
//const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const userControl = require("../controllers/usersController");
const server = express();

server.use("/register", userControl);


module.exports = server;