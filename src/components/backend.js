const Cart = (function Backend() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function getCart() {
        return cart;
    }

    function _itemExistsInCart(item) {
        return cart.find((x) => x.id === item.id);
    }

    function addItem(item) {
        let itemInCart = _itemExistsInCart(item);
        if (itemInCart) {
            itemInCart.quantity += 1;
            itemInCart.total += item.price;
        } else {
            item.quantity = 1;
            item.total = item.price;
            cart.push(item);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function removeItem(item) {
        let itemInCart = _itemExistsInCart(item);
        if (!itemInCart) return;

        if (itemInCart.quantity > 1) {
            itemInCart.quantity -= 1;
            itemInCart.total -= item.price;
        } else {
            cart = cart.filter((x) => x.id !== item.id);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function getItemQuantity(item) {
        const itemInCart = _itemExistsInCart(item) || {};
        const quantity = itemInCart.quantity || 0;
        return quantity;
    }

    function getItemTotal(item) {
        const itemInCart = _itemExistsInCart(item) || {};
        const total = itemInCart.total || 0;
        return total;
    }

    function getNumberOfItems() {
        return cart.reduce((acc, curr) => acc + curr.quantity, 0);
    }

    function getCartTotal() {
        return cart.reduce((acc, curr) => acc + curr.total, 0);
    }

    return {
        getCart,
        addItem,
        removeItem,
        getItemQuantity,
        getItemTotal,
        getNumberOfItems,
        getCartTotal,
    };
})();

export default Cart;
