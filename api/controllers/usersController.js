const User = require('../models/userModel')
const express = require("express");
const router = express.Router();



router.get("/:email", async (req, res) => {
  const { email } = req.params;
      const {
        firtsName,
        lastName,
        //email,
        address,
        email_verified,
        socials,
        info,
      } = req.body;

  if (!email) {
    return res.status(400).send("Sorry!, Email is required");
  }
  //busca el usuario por el email y si existe retorna la informacion, de lo contrario lo crea
  let userData = await User.findOne({ email });
  if (userData) res.json(userData);
  else {
    userData = new User({
      firtsName,
      lastName,
      email,
      address,
      email_verified,
      socials,
      info,
    });

    userData = await userData.save();

    res.json(userData);
  }
});

// router.post("/", async (req, res) => {
//     const {
//       firtsName,
//       lastName,
//       email,
//       address,
//       email_verified,
//       social,
//       info,
//     } = req.body;

//     //verificamos que el usuario no exista ya en la BDD
//   let user = await User.findOne({ email });
//   if (user) return res.status(202).send("User already exist...");

//   if(email){
//     user = new User({
//       firtsName,
//       lastName,
//       email,
//       address,
//       email_verified,
//       social,
//       info,
//     });

//     user = await user.save();

//     res.send(user);
//   }
//   else {
//     res.send({message: "the email is required"});
//   }

// });





module.exports = router

