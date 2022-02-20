function checkNewProductValidation(product) {
    return (
        product.title.trim().length > 5 &&
        product.price > 0 &&
        product.image.trim().length > 0 &&
        product.description.trim().length > 20 &&
        product.summary.trim().length > 10
    );
}
function checkUpdateProductValidation(product) {
    return (
        product.title.trim().length > 5 &&
        product.price > 0 &&
        product.description.trim().length > 20 &&
        product.summary.trim().length > 10
    );
}

module.exports = { checkNewProductValidation, checkUpdateProductValidation };
