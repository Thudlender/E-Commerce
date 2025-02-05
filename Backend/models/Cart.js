const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CartSchema = new Schema(
  {
    quantity: { type: String, require: true },
    email: { type: String, require: true },
    name: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const CartModel = model("Cart", CartSchema);
module.exports = CartModel;
