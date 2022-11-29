const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");
const Joi = require("joi");
const express = require("express");
const genAuthToken = require("../utils/genAuthToken");
const router = express.Router();

router.post("/", async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(), 
    });

    const { error } = schema.validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Sorry!, User already exist...");

    console.log("here");

    const { name, email, password } = req.body;

    user = new User({
        name,
        //lastName,
        email,
        password,
        //address,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();

    const token = genAuthToken(user);

    res.send(token);
});

module.exports = router;



