const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripse.controller");

router.post("/create-checkout-session",stripeController.createCheckPutSession);

module.exports = router;
