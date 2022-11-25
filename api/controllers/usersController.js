const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')


// @desc   Register new User
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ email })
    
    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    // Create user
    const user = await User.create({
        firtsName,
        lastName,
        email,
        password: hashedPassword,
        adress
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            firstName: user.name,
            lastName: user.lastName,
            email: user.email,
            adress: user.adress,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc   Authenticate an user
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    // Check for user email
    const user = await User.findOne({ email })

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    })
    } else {
        res.status(400)
        throw new Error('Invalid credential')
    }
})

// @desc   Get user data
// @route  Get /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}



/*
//const jwt = require('jsonwebtoken');
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

    //Verificamos que la validacion no contenga errores
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

*/