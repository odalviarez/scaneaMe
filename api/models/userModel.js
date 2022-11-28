const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a first name"],
    },
    //lastName: {
      //type: String,
      //required: [true, "Please add a last name"],
    //},
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    //address: {
    //  type: String,
     // required: [true, "Please add an adress"],
    //},
    products: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Product",
    },
    isAdmin: {
      type: Boolean, 
      default: false
    }
  },
  
  {
    timestamps: true,
  }
);

// module.exports = mongoose.model('User', userSchema)

const User = mongoose.model("User", userSchema);

exports.User = User;