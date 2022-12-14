const express = require("express");
const Products = require("../models/productModel");
const cloudinary = require('../Utils/cloudinary')
const { auth, claimCheck } = require("express-oauth2-jwt-bearer");
const checkJwt = auth();
const checkClaims = claimCheck((claims) => {
  return claims.permissions.includes("read:users");
});

const router = express.Router();

//* GET ALL PRODUCTS: retorna todos los productos con la info necesaria para las cards.
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
            season: e.season,
            price: e.price,
            image: e.image,
            stock: e.stock,
            comments: e.comments,
          };
        })
      );
    } else {
      res.status(400).json({ message: "products not exist" });
    }
  } catch (error) {
    res.send(error);
  }
});

//* CREATE PRODUCT: crea un producto
router.post("/", checkJwt, checkClaims, async (req, res) => {
  const { name, color, type, price, image, stock, season } = req.body;
  console.log(req.body);
  try {
    //si recibe stock y no es un arreglo retorna un error
    if (stock) {
      if (!Array.isArray(stock))
        return res.status(400).json({ message: "stock should be array type" });
    }
    //si recibe los campos obligatorios crea el producto
    if (name && type && price) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "Products"});
      let productCreate = new Products({
        name,
        color,
        type,
        price,
        season,
        image: result.secure_url,
        stock,
      });
      console.log(productCreate);
      let saved = await productCreate.save();
      res.json(saved);
    } else {
      res.send({ message: "please complete all fields" });
    }
  } catch (error) {
    res.send(error.message);
  }
});

//* GET PRODUCT DETAILS: retorna toda la informacion del producto indicado por el id.
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

//* DELETE PRODUCT: elimina un producto por el id.
//TODO: falta implementar.
router.delete("/:id", checkJwt, checkClaims, async (req, res) => {
  let { id } = req.params;
  try {
    const deletedProduct = await Products.findByIdAndDelete(id);
    console.log(deletedProduct);
    if (deletedProduct) res.status(200).send(deletedProduct);
    else res
      .status(400)
      .json({ message: "the product to be deleted does not exist" });
  } catch (error) {
    res.json(error.message);
  }
});



//* UPDATE PRODUCT RATING: actualiza un producto existente
  router.put("/comments/:id", async (req, res) => {
    let { id } = req.params;
    const { comments } = req.body;
    try {
      if (id && comments) {
        let detailsProduct = await Products.findById(id); 
        let query = {
          comments: [...detailsProduct.comments, comments],
        };
        const updateProduct = await Products.updateOne({ _id: id }, query);
        res.json(query);
      } else {
        res.send({ message: "please complete all fields" });
      }
    } catch (error) {
      res.json(error.message);
    }
  });


//* UPDATE PRODUCT: actualiza un producto existente
router.put("/:id", async (req, res) => {
  let { id } = req.params;
  
  const { name, color, type, price, image, stock, season } = req.body;
  console.log(req.body);
  try {
    //si recibe stock y no es un arreglo retorna un error
    if (stock) {
      if (!Array.isArray(stock))
        return res.status(400).json({ message: "stock should be array type" });
    }
    if (name && type && price) {
      let query = {
        name,
        color,
        type,
        season,
        price,
        image,
        stock,
      };
      const updateProduct = await Products.updateOne({ id }, query);
      res.json(updateProduct);
    } else {
      res.send({ message: "please complete all fields" });
    }
  } catch (error) {
    res.json(error.message);
  }
});


module.exports = router;
