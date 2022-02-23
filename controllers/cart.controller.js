const Product = require("../models/product.model");

async function getCart(req, res) {
    res.render("customer/cart/cart");
}

async function addCartItem(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.body.productId);
    } catch (error) {
        next(error);
        return;
    }
    const cart = res.locals.cart;

    cart.addItem(product);
    req.session.cart = cart;

    res.status(201).json({
        message: "Product added to cart!",
        newTotalItems: cart.totalQuantity,
    });
}

function updateCartItem(req, res) {
    const cart = res.locals.cart;
    const updatedItemData = cart.updateItem(
        req.body.productId,
        req.body.quantity
    );
    req.session.cart = cart;

    res.status(200).json({
        message: "Product updated!",
        updatedCartData: {
            newTotalQuantity: cart.totalQuantity,
            newTotalPrice: cart.totalPrice,
            updatedItemPrice: updatedItemData.updatedItemPrice,
        },
        newTotalItems: cart.totalQuantity,
    });
}

module.exports = { addCartItem, getCart, updateCartItem };
