const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");
const Joi = require("joi");
const express = require("express");
const genAuthToken = require("../utils/genAuthToken");
const router = express.Router();

router.post("/", async (req, res) => {
    const schema = Joi.object({
        firtsName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(), 
        adress:Joi.string().min(10).max(150).required(),
    });

    const { error } = schema.validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Sorry!, User already exist...");

    console.log("here");

    const { firtsName, lastName, email, password, adress } = req.body;

    user = new User({
        firtsName,
        lastName,
        email,
        password,
        adress,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();

    const token = genAuthToken(user);

    res.send(token);
});

module.exports = router;



/*
const express = require('express');
//const router = express.Router();
const {protect} = require('../middleware/auth');
const registerControl = require("../controllers/registersController");
const server = express();
const router = express.Router();

//server.use("/register", registerControl);

router.route('/register', registerControl)


//module.exports = server;
module.exports = router;
*/