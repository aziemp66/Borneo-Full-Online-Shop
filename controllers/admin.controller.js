function getProducts(req, res) {
    res.render("admin/products/all-products");
}

function getNewProducts(req, res) {
    res.render("admin/products/new-product");
}

function createNewProduct() {}

module.exports = {
    getProducts,
    getNewProducts,
    createNewProduct,
};
