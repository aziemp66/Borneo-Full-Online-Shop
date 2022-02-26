const stripe = require("stripe")(
    "sk_test_51KX2xhInYaFd5n7OhikvHu4lQKupSVQSZmBrspH1RFWC2Hfcqb5Hdd7A6OpW80kslOaYXy061LrjLrDJ1r5WhOHI00VF6bzG5W"
);

const Order = require("../models/order.model");
const User = require("../models/user.model");

async function getOrders(req, res) {
    try {
        const orders = await Order.findAllForUser(res.locals.uid);
        res.render("customer/orders/all-orders", { orders: orders });
    } catch (error) {
        return next(error);
    }
}

async function addOrder(req, res, next) {
    const cart = res.locals.cart;

    let userDocument;
    try {
        userDocument = await User.findById(res.locals.uid);
    } catch (error) {
        return next(error);
    }

    const order = new Order(cart, userDocument);

    try {
        await order.save();
    } catch (error) {
        return next(error);
    }

    req.session.cart = null;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Dummy",
                    },
                    unit_amount_decimal: 10.99,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `localhost:3000/orders/success`,
        cancel_url: `localhost:3000/orders/failure`,
    });

    res.redirect(303, session.url);
}

function getSuccess(req, res) {
    res.render("customer/orders/success");
}

function getFailure(req, res) {
    res.render("customer/orders/failure");
}

module.exports = { addOrder, getOrders, getSuccess, getFailure };
