const User = require('../models/userModel')
const express = require("express");
const { db } = require('../models/userModel');
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
        sub,
      } = req.body;

  if (!email) {
    return res.status(400).send("Sorry!, Email is required");
  }
  //busca el usuario por el email y si existe retorna la informacion, de lo contrario lo crea
  try {
  let userData = await User.findOne({ email });
  if (userData) {res.json(userData);
  } else {
    userData = new User({
      firtsName,
      lastName,
      email,
      address,
      email_verified,
      socials,
      info,
      sub,
    });

    userData = await userData.save();
    res.json(userData);
  } } catch (error){
    res.status(400).send("Could not create user", error.message)
  }
});

router.put("/:email", async (req, res) => {
  const { email } = req.params;
    const {
      socials
    } = req.body;

    try{
 // verificamos que el usuario no exista ya en la BDD
  // let user = await User.findOne({ email });
  // console.log("este es el user sin actualizar", user);
  // if (!user) return res.status(202).send("User not found...");

  // if(user){
    // let updateUser = await db.scaneaMe.users.updateOne ({email: email},
    //   {
    //     $set: { socials: socials} })
      

  //   // updatedUser = await user.save();
  //   console.log("este es el user actualsizado", user);

  //   res.status(200).send(user);

  const updateUser = await User.updateOne({email}, {socials: socials})
  console.log('este es el console log', updateUser);
  res.json(updateUser);

  } catch (error) {
    res.status(400).send("Could not update user", error.message)
  }
});





module.exports = router

