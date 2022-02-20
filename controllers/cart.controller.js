function addCartItem(req, res) {
    res.locals.card.addItem();
}

module.exports = { addCartItem };
