const User = require("../models/userModel");
const express = require("express");
const { db } = require("../models/userModel");
const router = express.Router();
const cloudinary = require("../Utils/cloudinary");
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");
const checkJwt = auth();

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
  } = req.body;
  if (!email) {
    return res.status(400).send("Sorry!, Email is required");
  }
  //busca el usuario logeado por el email y si existe retorna la informacion, de lo contrario lo crea
  try {
    let userData = await User.findOne({ email });
    if (userData) {
      res.json(userData);
    } else {
      console.log("entro a crear usaurio");
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
      res.json(userData);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//Busca el perfil de usuario y retorna todos sus datos
router.get("/:email", async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).send("Sorry!, Email is required");
  }
  //busca el usuario por el email y si existe retorna la informacion, de lo contrario lo crea
  try {
    let userData = await User.findOne({ email });
    if (userData) {
      res.json(userData);
    } else {
      res.json({ message: "profile not found" });
    }
  } catch (error) {
    res.status(400).send("Could not create user", error.message);
  }
});

//acrtualiza los datos del usuario logeado
router.put("/:email", async (req, res) => {
  const { email } = req.params;
  // console.log('body: ', req.body)
  const { socials, image } = req.body;
  let userData = await User.findOne({ email });
  try {
    let result = "";
    if (image) {
      result = await cloudinary.uploader.upload(image, {
        folder: "User Profile",
      });
    }
    const updateUser = await User.updateOne(
      { email },
      {
        socials: {
          instagram: socials.instagram? socials.instagram: userData.socials.instagram,
          facebook: socials.facebook? socials.facebook: userData.socials.facebook,
          twitter: socials.twitter? socials.twitter: userData.socials.twitter,
          linkedin: socials.linkedin? socials.linkedin: userData.socials.linkedin,
        },
        image: image
          ? { public_id: result.public_id, url: result.secure_url }
          : userData.image,
      }
    );

    res.json(updateUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
