const express = require("express");
//const Product = require("../models/productModel");
const Product = require("../productos");


const router = express.Router();


router.get ("/", async (req, res) =>{
    res.json(Product);
})



module.exports = router;