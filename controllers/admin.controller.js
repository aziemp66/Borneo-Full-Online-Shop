const Product = require("../models/product.model");
const productValidation = require("../util/product-validation");

async function getProducts(req, res, next) {
    try {
        const products = await Product.findAll();
        res.render("admin/products/all-products", { products: products });
    } catch (error) {
        next(error);
        return;
    }
}

function getNewProducts(req, res) {
    res.render("admin/products/new-product");
}

async function createNewProduct(req, res, next) {
    const product = new Product({
        ...req.body,
        image: req.file.filename,
    });

    if (!productValidation.checkNewProductValidation(product)) {
        const error = new Error("Invalid product data.");
        error.status = 400;
        next(error);
        return;
    }

    try {
        await product.save();
    } catch (error) {
        next(error);
        return;
    }
    res.redirect("/admin/products");
}

async function getUpdateProduct(req, res, next) {
    try {
        const product = await Product.findById(req.params.id);
        res.render("admin/products/update-product", { product: product });
    } catch (error) {
        next(error);
    }
}

async function updateProduct(req, res, next) {
    const product = new Product({
        ...req.body,
        _id: req.params.id,
    });
    if (req.file) {
        //replace the old image with the new one
        product.replaceImage(req.file.filename);
    }

    if (!productValidation.checkUpdateProductValidation(product)) {
        const error = new Error("Invalid product data.");
        error.status = 400;
        next(error);
        return;
    }

    try {
        await product.save();
    } catch (error) {
        next(error);
        return;
    }
    res.redirect("/admin/products");
}

async function deleteProduct(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id);
        await product.delete();
    } catch (error) {
        next(error);
        return;
    }
    res.json({ message: "Product deleted" });
}

module.exports = {
    getProducts,
    getNewProducts,
    createNewProduct,
    getUpdateProduct,
    updateProduct,
    deleteProduct,
};
