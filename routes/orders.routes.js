const express = require("express");

const ordersController = require("../controllers/orders.controller");

const router = express.Router();

router.get("/", ordersController.getOrders);

router.post("/", ordersController.addOrder);

module.exports = router;
