class Cart {
    constructor(items = []) {
        this.items = items;
    }

    addItem(product) {
        const cartItem = {
            product: product,
            quantity: 1,
            totalPrice: product.price,
        };

        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.product.id === product.id) {
                cartItem.quantity = cartItem.quantity + 1;
                cartItem.totalPrice = cartItem.totalPrice + product.price;
                this.items[i] = cartItem;
            } else {
                this.items.push(cartItem);
            }
        }
    }
}
