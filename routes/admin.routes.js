const express = require("express");

const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.get("/products", adminController.getProducts); // /admin/products

router.get("/products/new", adminController.getNewProducts); // /admin/products/new

router.post("products/new", adminController.createNewProduct);

module.exports = router;
