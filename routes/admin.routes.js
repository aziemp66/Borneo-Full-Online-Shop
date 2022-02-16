const express = require("express");

const adminController = require("../controllers/admin.controller");
const imageUploadMiddleware = require("../middlewares/image-upload");

const router = express.Router();

router.get("/products", adminController.getProducts); // /admin/products

router.post(
    "/products",
    imageUploadMiddleware,
    adminController.createNewProduct
);

router.get("/products/new", adminController.getNewProducts); // /admin/products/new

router.get("/products/:id", adminController.getUpdateProduct);

router.post("/products/:id", adminController.updateProduct);

module.exports = router;
