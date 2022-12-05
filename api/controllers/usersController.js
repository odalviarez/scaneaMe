const User = require('../models/userModel')
const express = require('express')
const { db } = require('../models/userModel')
const router = express.Router()
const cloudinary = require('../Utils/cloudinary')

router.post("/login/:email", async (req, res) => {
  const { email } = req.params;
  const {
    firtsName,
    lastName,
    //email,
    address,
    email_verified,
    socials,
    info,
    sub,
    picture,
  } = req.body
  if (!email) {
    return res.status(400).send('Sorry!, Email is required');
  }
  //busca el usuario logeado por el email y si existe retorna la informacion, de lo contrario lo crea
  try {
    let userData = await User.findOne({ email });
    if (userData) {
      res.json(userData)
    } 
    else {
      console.log("entro a crear usaurio")
        userData = new User({
          firtsName,
          lastName,
          email,
          address,
          email_verified,
          socials,
          info,
          sub,
          image: { public_id: picture, url: picture },
        });
        userData = await userData.save();
        res.json(userData)
    }
  } catch (error) {
    res.status(400).json(error.message)
  }
})


//Busca el perfil de usuario y retorna todos sus datos
router.get('/:email', async (req, res) => {
  const { email } = req.params
  if (!email) {
    return res.status(400).send('Sorry!, Email is required')
  }
  //busca el usuario por el email y si existe retorna la informacion, de lo contrario lo crea
  try {
    let userData = await User.findOne({ email })
    if (userData) {
      res.json(userData)
    } else {
      res.json({ message: 'profile not found' })
    }
  } catch (error) {
    res.status(400).send('Could not create user', error.message)
  }
})


//acrtualiza los datos del usuario logeado
router.put('/:email', async (req, res) => {
  const { email } = req.params
  // console.log('body: ', req.body)
  const { socials, image } = req.body
  console.log(req.body)
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: 'User Profile',
      transformation: [
        { gravity: 'face', height: 900, width: 900, crop: 'thumb' },
        { crop: 'scale' },
      ],
    })
    const updateUser = await User.updateOne(
      { email },
      {
        socials,
        image: { public_id: result.public_id, url: result.secure_url },
      }
    )

    res.json(updateUser)
  } catch (error) {
    res.status(400).send('Could not update user MOFO', error.message)
  }
})

module.exports = router
