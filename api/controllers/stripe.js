const express = require("express");
const Stripe = require("stripe");
const Order = require("../models/orderModel");
const Products = require("../models/productModel");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const router = express.Router();

//* CREATE CHECKOUT SESSION: crea un usuario y una sesión para checkout de la compra (paso necesario de Stripe, no confundir con el usuario loggueado en la página).
router.post("/create-checkout-session", async (req, res) => {
  let { cartItems, userEmail } = req.body;
  let purchase = cartItems.map((e) => {
    return { id: e.id, cartTotalQuantity: e.cartTotalQuantity, size: e.size }; //
  });

  const customer = await stripe.customers.create({
    metadata: {
      userEmail,
      cartItems: JSON.stringify(purchase),
    },
  });
  const line_items = cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.name,
        },
        unit_amount: item.price * 100, //! Esto está bien?
      },
      quantity: item.cartTotalQuantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "VE", "AR"],
    },
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    customer: customer.id,
    success_url: `${process.env.CLIENT_URL}/checkout/${customer.metadata.userEmail}`, //checkout-success
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({ url: session.url });
});

//? Qué hace esta ruta? Que action creator la ejecuta?
//! ESTO SOLO FUNCIONA CUANDO ESTA EN DEPLOY
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];
    let data;
    let eventType;

    // Check if webhook signing is configured.
    let endpointSecret;
    endpointSecret = process.env.STRIPE_WEB_HOOK;
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.log(`❌ Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    // Extract the object from the event.
    data = event.data.object;
    eventType = event.type;

    // Handle the event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          stripe.checkout.sessions.listLineItems(
            data.id,
            {},
            function (err, lineItems) {
              discountStock(customer);
              createOrder(customer, data, lineItems);
            }
          );
        })
        .catch((err) => console.log(err.message));
    }

    res.json({ received: true });
  }
);

//* CREATE ORDER para utilizar en la ruta anterior
const createOrder = async (customer, data, lineItems) => {
  const newOrder = new Order({
    email: customer.metadata.userEmail,
    cartItems: customer.metadata.cartItems,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: lineItems.data,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });

  try {
    const savedOrder = await newOrder.save();
  } catch (err) {
    console.log(err);
  }
};

const discountStock = async (customer) => {
  let product = JSON.parse(customer.metadata.cartItems);

  product.map(async (elem) => {
    let detailsProduct = await Products.findById(elem.id);
    console.log("producto: ", detailsProduct);
    detailsProduct.stock.forEach((element, index) => {
      if (elem.size === element.size) {
        detailsProduct.stock[index].quantity =
          detailsProduct.stock[index].quantity - elem.cartTotalQuantity;
      }
    });

    let stock = { stock: detailsProduct.stock };
    console.log("stock ", stock);
    const updateProduct = await Products.updateOne({ id: elem.id }, stock);

    console.log(updateProduct);
  });
};
module.exports = router;
