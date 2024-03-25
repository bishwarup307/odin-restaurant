import Cart from "../backend.js";
import styles from "./cart.module.css";
import { Photo, AddRemoveButton } from "../menu/menu.js";

export default function CartContent() {
    const cartContent = document.createElement("div");
    cartContent.classList.add(styles.cartContent);

    const cartItems = Cart.getCart();

    cartItems.forEach((cartItem) => {
        cartContent.appendChild(cartItemComponent(cartItem));
    });

    return cartContent;
}

function cartItemComponent(item) {
    const cartItemContainer = document.createElement("div");
    cartItemContainer.classList.add(styles.cartItemContainer);

    const leftContainer = document.createElement("div");
    leftContainer.classList.add(styles.leftContainer);

    const itemPhoto = Photo(item, false);
    leftContainer.appendChild(itemPhoto);

    const itemDetails = document.createElement("div");
    itemDetails.classList.add(styles.itemDetails);

    const itemName = document.createElement("p");
    itemName.classList.add(styles.itemName);
    itemName.textContent = `${item.name} (${item.quantity})`;
    itemDetails.appendChild(itemName);

    const price = document.createElement("div");
    price.classList.add(styles.price);
    price.textContent = `₹ ${item.price}`;
    itemDetails.appendChild(price);

    leftContainer.appendChild(itemDetails);

    cartItemContainer.appendChild(leftContainer);

    const rightContainer = document.createElement("div");
    rightContainer.classList.add(styles.rightContainer);

    const itemTotal = document.createElement("div");
    itemTotal.classList.add(styles.itemTotal);
    itemTotal.textContent = `₹ ${item.total}`;
    rightContainer.appendChild(itemTotal);

    const secondaryButton = AddRemoveButton(item);
    secondaryButton.btn.classList.add(styles.secondaryButton);
    rightContainer.appendChild(secondaryButton.btn);

    cartItemContainer.appendChild(rightContainer);
    return cartItemContainer;
}
