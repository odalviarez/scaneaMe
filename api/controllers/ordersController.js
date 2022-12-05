const { Order } = require("../models/orderModel");
//const { auth, isUser, isAdmin } = require("../middleware/auth");

const router = require("express").Router();

//CREATE

// createOrder is fired by stripe webhook
// example endpoint

//* CREATE ORDER
//TODO: pendiente implementar.
//? Cómo está funcionando el carrito hoy si esto no está implementado?
router.post("/", auth, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(201).send(savedOrder);
  } catch (err) {
    res.status(500).send(err);
  }
});

//* UPDATE ORDER: exclusivo para ADMIN. Actualiza una orden hecha. UTILIDAD? 
//? Cuál es la utilidad, para qué un admin modificaría un pedido hecho por un cliente?
//! ELIMINAR
// // router.put("/:id", isAdmin, async (req, res) => {
// //   try {
// //     const updatedOrder = await Order.findByIdAndUpdate(
// //       req.params.id,
// //       {
// //         $set: req.body,
// //       },
// //       { new: true }
// //     );
// //     res.status(200).send(updatedOrder);
// //   } catch (err) {
// //     res.status(500).send(err);
// //   }
// // });


//* DELETE ORDER: exclusivo para ADMIN.
//TODO: pendiente implementar.
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("Order has been deleted...");
  } catch (err) {
    res.status(500).send(err);
  }
});

//* USER GET ORDERS: exclusivo para USUARIO.
//TODO: pendiente implementar.
router.get("/find/:userId", isUser, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

//* ADMIN GET ORDERS: exclusivo para ADMIN. Se utilizaría en el panel de control del admin para ver las órdenes del usuario.
//TODO: pendiente implementar.
router.get("/", isAdmin, async (req, res) => {
  try {
    const orders = await Order.find(); 
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

//* GET MONTHLY INCOME: exclusivo para ADMIN. Se utilizaría en el panel de analíticas para ver ventas de la página.
//TODO: pendiente implementar.
router.get("/income", isAdmin, async (req, res) => {
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