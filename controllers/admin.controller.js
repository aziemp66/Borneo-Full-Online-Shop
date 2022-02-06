function getProducts(req, res) {
    res.render("admin/products/all-products");
}

function getNewProducts(req, res) {
    res.render("admin/products/new-product");
}

function createNewProduct(req, res) {
    console.log(req.body);
    console.log(req.file);
}

module.exports = {
    getProducts,
    getNewProducts,
    createNewProduct,
};
