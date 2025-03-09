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
    // เพิ่ม timestamps ที่นี่เพื่อให้ mongoose สร้าง field สำหรับเก็บวันที่เวลาที่สร้างและแก้ไขข้อมูลให้เรา
  }
);

const CartModel = model("Cart", CartSchema);
module.exports = CartModel;
