const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a text value"],
    },
    type: {
      type: String,
      required: [true, "Please add a text value"],
    },
    season: {
      type: String,
      default: "allyear"
    },
    stock: {
      type: Array,
      require: [true, "Please add a array value"],
    },
    comments: {
      type: Array,
      require: false,
    },
    ratings: {
      type: Array,
      require: false,
    },
    color: {
      type: String,
      required: [true, "Please add a text value"],
    },
    price: {
      type: Number,
      require: [true, "Please add a price value"],
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Product", productSchema);
