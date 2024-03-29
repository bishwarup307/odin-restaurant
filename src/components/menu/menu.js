import menuItems from "../../data/menu.json";
import style from "./menu.module.css";
import commonStyles from "../../common.module.css";
import Cart from "../backend.js";

export default function Menu() {
    // console.log(menuItems);
    const menu = document.createElement("div");
    menu.classList.add(style.menu);
    menuItems.forEach((menuItem) => {
        menu.appendChild(ItemComponent(menuItem));
    });
    return menu;
}

function ItemComponent(item) {
    const itemGrid = document.createElement("div");
    itemGrid.classList.add(style.itemGrid);

    itemGrid.appendChild(DishVegNonveg(item));
    itemGrid.appendChild(Photo(item));

    const { titleDiv, btnClickEventHandler } = Title(item);
    itemGrid.appendChild(titleDiv);

    const price = document.createElement("p");
    price.classList.add(style.price);
    price.innerHTML = `₹ ${item.price}`;
    itemGrid.appendChild(price);

    itemGrid.appendChild(Rating(item));
    itemGrid.appendChild(MoreDetails(item, btnClickEventHandler));
    return itemGrid;
}

function DishVegNonveg({ category, bestSeller }) {
    const topDiv = document.createElement("div");
    topDiv.classList.add(style.topDiv);

    const icon = document.createElement("div");
    icon.classList.add(style.categoryIcon);

    let iconSvg;
    if (category === "non-veg") {
        iconSvg = `<?xml version="1.0"?>
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
          "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 200 200">
        <g fill="none" stroke-width="5">
        <rect width="150" height="150" x="25" y="25" stroke="#92282a"/>
        </g>
        <circle cx="100" cy="100" r="50" fill="#92282a"/>
        </svg>`;
    } else {
        iconSvg = `<?xml version="1.0"?>
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
          "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 200 200">
        <g fill="none" stroke-width="5">
        <rect width="150" height="150" x="25" y="25" stroke="#00923f"/>
        </g>
        <circle cx="100" cy="100" r="50" fill="#00923f"/>
        </svg>`;
    }
    icon.innerHTML = iconSvg;
    topDiv.appendChild(icon);

    if (bestSeller) {
        const bestSellerText = document.createElement("p");
        bestSellerText.classList.add(style.bestSeller);
        bestSellerText.textContent = "Bestseller";
        topDiv.appendChild(bestSellerText);
    }
    return topDiv;
}

export function Photo({ discount, url }, addDiscount = true) {
    const URL = "https://ik.imagekit.io/bishwarup307/odin-restaurant/";

    const imageDiv = document.createElement("div");
    imageDiv.classList.add(style.imageContainer);

    const photo = document.createElement("img");
    photo.classList.add(style.item__photo);
    photo.src = `${URL}${url}?tr=w-600,h-400`;
    imageDiv.appendChild(photo);

    if (addDiscount) imageDiv.appendChild(Discount(discount));
    return imageDiv;
}

function Discount(discount) {
    const discountDiv = document.createElement("div");
    discountDiv.classList.add(style.discountContainer);

    const discountIcon = document.createElement("div");
    discountIcon.classList.add(style.discountIcon);
    discountIcon.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="discount" class="icon glyph" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21.59,9.83A4.21,4.21,0,0,1,21.17,9,4.73,4.73,0,0,1,21,8.07a4.19,4.19,0,0,0-.64-2.16,4.15,4.15,0,0,0-1.87-1.28,4.36,4.36,0,0,1-.84-.43A4.55,4.55,0,0,1,17,3.54a4.29,4.29,0,0,0-1.81-1.4A4.19,4.19,0,0,0,13,2.21a4.24,4.24,0,0,1-1.94,0A4.19,4.19,0,0,0,8.8,2.14,4.29,4.29,0,0,0,7,3.54a4.55,4.55,0,0,1-.66.66,4.36,4.36,0,0,1-.84.43A4.15,4.15,0,0,0,3.62,5.91,4.19,4.19,0,0,0,3,8.07,4.73,4.73,0,0,1,2.83,9a4.21,4.21,0,0,1-.42.81A4.3,4.3,0,0,0,1.64,12a4.3,4.3,0,0,0,.77,2.17,4.21,4.21,0,0,1,.42.81,4.73,4.73,0,0,1,.15.95,4.19,4.19,0,0,0,.64,2.16,4.15,4.15,0,0,0,1.87,1.28,4.36,4.36,0,0,1,.84.43,4.55,4.55,0,0,1,.66.66,4.29,4.29,0,0,0,1.81,1.4,2.91,2.91,0,0,0,.87.13,6,6,0,0,0,1.36-.2,4.24,4.24,0,0,1,1.94,0,4.19,4.19,0,0,0,2.23.07A4.29,4.29,0,0,0,17,20.46a4.55,4.55,0,0,1,.66-.66,4.36,4.36,0,0,1,.84-.43,4.15,4.15,0,0,0,1.87-1.28A4.19,4.19,0,0,0,21,15.93a4.73,4.73,0,0,1,.15-.95,4.21,4.21,0,0,1,.42-.81A4.3,4.3,0,0,0,22.36,12,4.3,4.3,0,0,0,21.59,9.83ZM9.5,8A1.5,1.5,0,1,1,8,9.5,1.5,1.5,0,0,1,9.5,8Zm5,8A1.5,1.5,0,1,1,16,14.5,1.5,1.5,0,0,1,14.5,16Zm1.21-6.29-6,6a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42l6-6a1,1,0,0,1,1.42,1.42Z"></path></g></svg>`;
    discountDiv.appendChild(discountIcon);

    const discountText = document.createElement("p");
    discountText.classList.add(style.discountText);
    discountText.textContent = `${discount || -1}% off`;
    discountDiv.appendChild(discountText);

    if (!discount) discountDiv.classList.add(style.delete);

    return discountDiv;
}

function Rating({ rating, reviews }) {
    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add(style.rating);
    ratingDiv.style.setProperty("--rating", rating);
    ratingDiv.textContent = `${rating} (${reviews})`;
    return ratingDiv;
}

function Title(item) {
    const titleDiv = document.createElement("div");
    titleDiv.classList.add(style.titleContainer);

    const title = document.createElement("p");
    title.classList.add(style.title);
    title.textContent = item.name;
    titleDiv.appendChild(title);

    const { buttonContainer, btnClickEventHandler } = AddButton(item);
    titleDiv.appendChild(buttonContainer);

    return { titleDiv, btnClickEventHandler };
}

export function AddRemoveButton(item) {
    const btn = document.createElement("div");
    btn.classList.add(style.addedStateContainer);

    const removeItemBtn = document.createElement("button");
    removeItemBtn.classList.add(style.childButton);
    removeItemBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12L18 12" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
    btn.appendChild(removeItemBtn);

    const quantitySpan = document.createElement("span");
    quantitySpan.classList.add(style.quantitySpan);
    quantitySpan.textContent = Cart.getItemQuantity(item);
    btn.appendChild(quantitySpan);

    const addItemBtn = document.createElement("button");
    addItemBtn.classList.add(style.childButton);
    addItemBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
    btn.appendChild(addItemBtn);

    function updateQuantityDisplay() {
        const quantity = Cart.getItemQuantity(item);
        quantitySpan.textContent = quantity;
    }

    removeItemBtn.addEventListener("click", () => {
        Cart.removeItem(item);
        updateQuantityDisplay();
    });

    addItemBtn.addEventListener("click", () => {
        Cart.addItem(item);
        updateQuantityDisplay();
    });

    return { btn, updateQuantityDisplay };
}

function AddButton(item) {
    const buttonContainer = document.createElement("div");

    const addBtn = document.createElement("button");
    const classNames = commonStyles.btnPrimary.split(" ");
    classNames.forEach((className) => addBtn.classList.add(className));
    addBtn.classList.add(commonStyles.btnSmall);
    addBtn.classList.add(style.addBtn);
    addBtn.textContent = "ADD";
    addBtn.id = item.id;
    buttonContainer.appendChild(addBtn);

    const secondaryButton = AddRemoveButton(item);
    buttonContainer.appendChild(secondaryButton.btn);

    function toggleButtonDisplay() {
        const quantity = Cart.getItemQuantity(item);
        if (quantity > 0) {
            addBtn.style.display = "none";
            secondaryButton.btn.style.display = "flex";
        } else {
            addBtn.style.display = "flex";
            secondaryButton.btn.style.display = "none";
        }
    }

    function btnClickEventHandler() {
        Cart.addItem(item);
        secondaryButton.updateQuantityDisplay();
        toggleButtonDisplay();
    }

    addBtn.addEventListener("click", () => btnClickEventHandler());

    document.addEventListener("DOMContentLoaded", () => toggleButtonDisplay());
    buttonContainer.addEventListener("DOMNodeInserted", () =>
        toggleButtonDisplay()
    );

    return { buttonContainer, btnClickEventHandler };
}

function MoreDetails(item, btnClickEventHandler) {
    const moreDetails = document.createElement("div");
    moreDetails.classList.add(style.moreDetails);

    const btn = document.createElement("button");
    btn.classList.add(style.btnMoreDetails);
    btn.textContent = "More details";
    moreDetails.appendChild(btn);

    const dialog = Popup(item, btnClickEventHandler);

    moreDetails.appendChild(dialog);
    btn.addEventListener("click", () => {
        dialog.showModal();
    });

    return moreDetails;
}

function Popup(item, btnClickEventHandler) {
    const dialog = document.createElement("dialog");
    dialog.classList.add(style.dialog);

    const dialogContainer = document.createElement("div");
    dialogContainer.classList.add(style.dialogContainer);

    dialogContainer.appendChild(Photo(item, false));

    const dialogBody = document.createElement("div");
    dialogBody.classList.add(style.dialogBody);

    const title = document.createElement("p");
    title.classList.add(style.title);
    title.textContent = item.name;
    dialogBody.appendChild(title);

    const details = document.createElement("p");
    details.classList.add(style.description);
    details.textContent = item.description;
    dialogBody.appendChild(details);

    const addBtn = document.createElement("button");
    const classNames = commonStyles.btnPrimary.split(" ");
    classNames.forEach((className) => addBtn.classList.add(className));
    addBtn.classList.add(commonStyles.btnSmall);
    addBtn.classList.add(style.addBtn);
    addBtn.id = item.id;
    addBtn.textContent = "Add to cart";
    dialogBody.appendChild(addBtn);

    addBtn.addEventListener("click", () => {
        btnClickEventHandler();
        dialog.close();
    });

    dialogContainer.appendChild(dialogBody);

    const clsButton = document.createElement("button");
    clsButton.classList.add(style.btnDialogClose);
    clsButton.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>`;
    dialogContainer.appendChild(clsButton);

    dialog.appendChild(dialogContainer);

    return dialog;
}
