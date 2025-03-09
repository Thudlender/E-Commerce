const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProductSchema = new Schema({
  title: { type: String, require: true },
  summary: { type: String, require: true },
  content: { type: String, require: true },
  cover: { type: String, require: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
},
{
  timestamps: true,
  // เพิ่ม timestamps ที่นี่เพื่อให้ mongoose สร้าง field สำหรับเก็บวันที่เวลาที่สร้างและแก้ไขข้อมูลให้เรา
}
);

const ProductModel = model("Product", ProductSchema);
module.exports = ProductModel;
