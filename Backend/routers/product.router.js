const express = require("express");
const router = express.Router();
const postController = require("../controllers/product.controller");
const { upload } = require("../middleware/file.middleware");
const authJwt = require("../middleware/authJwt.middleware");
//http://localhost:5000/api/v1/post
router.post("", authJwt.verifyToken, upload, postController.createProduct);
//http://localhost:5000/api/v1/post
router.get("", postController.getProducts);
//http://localhost:5000/api/v1/post/32132123131
router.get("/:id", postController.getProductById);
//http://localhost:5000/api/v1/post/32132123131
router.delete("/:id", authJwt.verifyToken, postController.deleteProduct);
//http://localhost:5000/api/v1/post/32132123131
router.put("/:id", authJwt.verifyToken, upload, postController.updateProduct);
module.exports = router;