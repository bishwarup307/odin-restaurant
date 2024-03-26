import Cart from "../backend.js";
import styles from "./cart.module.css";
import { Photo, AddRemoveButton } from "../menu/menu.js";
import commonStyles from "../../common.module.css";

export default function CartContent() {
    const DELIVERY_FEE = 30;

    const cartContent = document.createElement("div");
    cartContent.classList.add(styles.cartContent);

    const cartItems = Cart.getCart();

    cartItems.forEach((cartItem) => {
        cartContent.appendChild(cartItemComponent(cartItem, updateCartTotal));
    });

    const totalDiv = document.createElement("div");
    totalDiv.classList.add(styles.totalDiv);

    const cartTotal = document.createElement("p");
    const tax = document.createElement("p");
    const deliveryFee = document.createElement("p");
    deliveryFee.textContent = `Delivery charges: ₹ ${DELIVERY_FEE}`;
    const finalAmount = document.createElement("p");

    [cartTotal, tax, deliveryFee].forEach((element) => {
        element.classList.add(styles.totalDivItems);
        totalDiv.appendChild(element);
    });

    finalAmount.classList.add(styles.finalPrice);
    totalDiv.appendChild(finalAmount);

    cartContent.appendChild(totalDiv);

    const btnCheckOut = document.createElement("button");
    const classNames = commonStyles.btnPrimary.split(" ");
    classNames.forEach((className) => btnCheckOut.classList.add(className));
    btnCheckOut.classList.add(commonStyles.btnRegular);
    btnCheckOut.classList.add(styles.btnCheckout);
    btnCheckOut.textContent = "Proceed to pay";
    cartContent.appendChild(btnCheckOut);

    function updateCartTotal() {
        const total = Cart.getCartTotal();
        const taxAmount = Math.round(total * 0.05 * 100) / 100;
        cartTotal.textContent = `Price of items: ₹ ${total}`;
        tax.textContent = `Tax (GST): ₹ ${taxAmount}`;

        const finalPrice = total + taxAmount + DELIVERY_FEE;
        finalAmount.innerHTML = `Total payable: <span>₹ ${finalPrice}</span>`;
    }

    updateCartTotal();

    function updateCartDisplay() {
        const itemsInCart = Cart.getNumberOfItems();
        if (itemsInCart === 0) cartContent.style.display = "none";
        else cartContent.style.display = "flex";
    }

    cartContent.addEventListener("click", (e) => {
        if (e.target.closest("div").classList.contains(styles.secondaryButton))
            updateCartDisplay();
    });

    return { cartContent, updateCartDisplay };
}

function cartItemComponent(item, updateTotal) {
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

    secondaryButton.btn.addEventListener("click", () => {
        const itemTotalValue = Cart.getItemTotal(item);
        itemTotal.textContent = `₹ ${itemTotalValue}`;

        if (itemTotalValue === 0) cartItemContainer.style.display = "none";
        else {
            cartItemContainer.style.display = "flex";
        }
        updateTotal();
    });

    cartItemContainer.appendChild(rightContainer);
    return cartItemContainer;
}
