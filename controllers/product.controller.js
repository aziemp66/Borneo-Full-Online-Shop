const Product = require("../models/product.model");

async function getAllProducts(req, res, next) {
    try {
        const products = await Product.findAll();
        res.render("customer/products/all-products", { products: products });
    } catch (error) {
        next(error);
        return;
    }
}

async function getProductById(req, res, next) {
    try {
        const product = await Product.findById(req.params.id);
        res.render("customer/products/product-details", { product: product });
    } catch (error) {
        next(error);
        return;
    }
}

module.exports = {
    getAllProducts: getAllProducts,
    getProductById: getProductById,
};
