const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
//http://localhost:5000/api/v1/post
router.post("", authJwt.verifyToken, upload, cartController.createProduct);
//ลบ
//http://localhost:5000/api/v1/post/32132123131
router.delete("/:id", authJwt.verifyToken, cartController.deleteCart);
module.exports = router;
