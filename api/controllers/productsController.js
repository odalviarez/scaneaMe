const express = require("express");
//const Product = require("../models/productModel");
const Product = require("../productos");
const Products = require("../models/productModel");

const router = express.Router();

//para que traiga los datos hardcodeado BORRAR LUEGO
router.get("/test", async (req, res) => {
  res.json(Product);
});



router.get("/", async (req, res) => {
  try {
    let allProducts = await Products.find({});
    //cuando los datos no estan vacios se adapta la respuesta con los datos requeridos
    if (allProducts.length) {
      res.json(
        allProducts.map((e) => {
          return {
            id: e.id,
            name: e.name,
            color: e.color,
            type: e.type,
            price: e.price,
            image: e.image,
          };
        })
      );
    } else {
      res.status(400).json({ menssaje: "products not exist" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let detailsProduct = await Products.findById(id);
    if (detailsProduct) {
      res.json(detailsProduct);
    } else {
      res.status(400).json({ message: "product not found" });
    }
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
