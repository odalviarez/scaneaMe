const User = require("../models/userModel");
const express = require("express");
const { db } = require("../models/userModel");
const router = express.Router();
const cloudinary = require("../Utils/cloudinary");
const { auth, claimCheck } = require("express-oauth2-jwt-bearer");
const jwt_decode = require("jwt-decode");
const checkJwt = auth();
const checkClaims = claimCheck((claims) => {
  return claims.permissions.includes("read:users");
});


//* GET USER LOGIN: recibe el mail al hacer login en el cliente. Si el usuario ya existe en la DB, lo trae (GET), y si no existe en la DB, lo crea (POST).
//? Funciona la ruta creando un usuario manualmente, sin el log in de google?
router.post("/login/:email", async (req, res) => {
let { authorization } = req.headers;
let isAdmin = Boolean(jwt_decode(authorization).permissions.length);
console.log("isAdmin: ", isAdmin);
  const { email } = req.params;
  const {
    firtsName,
    lastName,
    address,
    email_verified,
    socials,
    info,
    sub,
    picture,
    cart,
  } = req.body;
  if (!email) {
    return res.status(400).send("Sorry!, Email is required");
  }
  //busca el usuario logeado por el email y si existe retorna la informacion, de lo contrario lo crea
  try {
    let userData = await User.findOne({ email });
    let response = "";
    if (userData && !cart) { //si existe y el carrito no tiene nada devuelve la info
      //res.json(userData);
    } 
    else if (!userData){ //si no existe lo crea 
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
        cart
      });
      response = await userData.save();
      console.log ("response create user: ", response)
      //res.json(userData);
    }
    else if (userData && cart) {  // si existe y tiene productos en el carrito lo actualiza
      console.log("por actualizar el cart")
      response = await User.updateOne({ email },{cart});
      console.log("update user cart: ", response);
    }
    if (userData) await User.updateOne({ email }, { isAdmin }); //si el usuario existe verifica actualiza siempre el esta de admin tomado desde auth0
    res.json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
});


//* GET USER: esta ruta se utiliza para ingresar a la página de perfil con las RRSS de un usuario registrado. Es la URL que devolvería el código QR al escanearse.
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
    res.status(400).send('Could not get or create user', error.message)
  }
})

//* USER UPDATE: actualiza las redes sociales y la imágen del usuario
router.put("/:email", checkJwt, async (req, res) => {
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
          instagram: socials.instagram
            ? socials.instagram
            : userData.socials.instagram,
          facebook: socials.facebook
            ? socials.facebook
            : userData.socials.facebook,
          twitter: socials.twitter ? socials.twitter : userData.socials.twitter,
          linkedin: socials.linkedin
            ? socials.linkedin
            : userData.socials.linkedin,
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
