const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel')


const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require("express");
const Joi = require('joi');
const User = require('../models/userModel')

const router = express.Router();


router.post("/", async (req, res) => {

    const {firtsName, lastName, email, password, adress } = req.body;

    //validamos los datos con joi
  const schema = Joi.object({
    firtsName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
    adress: Joi.string().min(3).max(40).required(),
  });
   // Verificamos que la validacion no contenga errores
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

    //verificamos que el usuario no exista ya en la BDD
  let user = await User.findOne({ email });
  if (user) return res.status(400).send("Sorry!, User already exist...");

  user = new User({//por propiedad de ES6 se genera key-value
    firtsName,
    lastName,
    email,
    password,
    adress,
  });

  //se hashsea la password (deberia llegar ya con hash?)
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();

  res.send(user);
});
module.exports = router

