const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");


router.get("", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.put("/:id", orderController.updateDeliveryStatus);
router.delete("/:id", orderController.deleteOrderById);

module.exports = router;