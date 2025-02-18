const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller");
//http://localhost:5000/api/v1/post
router.post("/", CartController.createCart);
router.get("/", CartController.getAllCartItems)
router.get("/:email", CartController.getCartItemsByEmail);
router.put("/:id", CartController.updateCartItem);
router.delete("/:id", CartController.deleteCartItem);
router.delete("/clear/:email", CartController.clearAllItems);

module.exports = router;
