const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    firtsName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    address: {
      type: String,
      required: false,
    },
    products: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Product",
    },
    image: {
      public_id:{
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      required: false
    },
    sub: {
      type: String,
      required: false,
    },
    email_verified: {
      type: Boolean,
      required: false,
    },
    info: {
      type: String,
      required: false,
    },
    socials: {
      type: Object,
      default: { instagram: "", facebook: "", linkedin: "", twitter: "" },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema)

// const User = mongoose.model("User", userSchema);

// exports.User = User;
