import Cart from "../backend.js";

const cartItems = Cart.getCart();
const mainDiv = document.createElement("div");

cartItems.forEach((item) => {
    const itemDiv = document.createElement("p");
    itemDiv.textContent = JSON.stringify(item);
    mainDiv.appendChild(itemDiv);
});

export default mainDiv;
