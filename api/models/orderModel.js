const mongoose = require ("mongoose");

const orderSchema = new mongoose.Schema(
    {
    email: { type: String, require: true },
    customerId: { type: String },
    paymentIntentId: { type: String },
    products: [],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: {type: String, required: true },
},
{ 
    timestamps: true 
}
);

module.exports = mongoose.model("Order", orderSchema);