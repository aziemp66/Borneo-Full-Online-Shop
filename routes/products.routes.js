const express = require("express");

const productController = require("../controllers/product.controller");

const router = express.Router();

router.get("/products", productController.getAllProducts);

router.get("/products/:id", productController.getProductById);

module.exports = router;
