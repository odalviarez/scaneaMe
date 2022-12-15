const express = require("express");
const Order = require("../models/orderModel");
const router = express.Router();
const { auth, claimCheck } = require("express-oauth2-jwt-bearer");
const checkJwt = auth();
const checkClaims = claimCheck((claims) => {
  return claims.permissions.includes("read:users");
});


//* CREATE ORDER
router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(201).send(savedOrder);
  } catch (err) {
    res.status(500).send(err);
  }
});

//* USER GET ORDERS: exclusivo para USUARIO.
router.get("/find/:email", async (req, res) => {
  const { email } = req.params
  try {
    const orders = await Order.find({ email });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

//* ADMIN GET ORDERS: exclusivo para ADMIN. Se utiliza en el panel de control del admin para ver las órdenes del usuario.
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

//* ADMIN UPDATE ORDERS: exclusivo para ADMIN. Se utiliza en el panel de control del admin para ver cambiar el estado de entrega de las ordenes del usuario.
router.put("/:orderId", async (req, res) => {
  const { orderId } = req.params
  const { deliveryStatus } = req.body;
  try {
    if (deliveryStatus) {
    let query = {
      delivery_status: deliveryStatus
    }
    let order = await Order.updateOne({_id: orderId}, query);
    res.status(200).json(order);
    }
  } catch (err) {
    res.status(500).send('No se pudo actualizar el delivery status en DB', err);
  }
});

//* GET MONTHLY INCOME: exclusivo para ADMIN. Se utilizaría en el panel de analíticas para ver ventas de la página.
//TODO: pendiente implementar.
router.get("/income", async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).send(income);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;