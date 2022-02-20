const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/products");
});

router.get("/401", (req, res) => {
    res.status(401).render("401", { pageTitle: "Not Authenticated" });
});

router.get("/403", (req, res) => {
    res.status(403).render("403", { pageTitle: "Not Authorized" });
});

module.exports = router;
