const express = require('express');
//const router = express.Router();
const {protect} = require('../middleware/auth');
const loginControl = require("../controllers/loginController");
const server = express();

server.use("/login", loginControl);


module.exports = server;
