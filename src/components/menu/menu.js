import menuItems from "../../data/menu.json";
import style from "./menu.module.css";
import commonStyles from "../../common.module.css";

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
    itemGrid.appendChild(Title(item));

    const price = document.createElement("p");
    price.classList.add(style.price);
    price.innerHTML = `₹ ${item.price}`;
    itemGrid.appendChild(price);

    itemGrid.appendChild(Rating(item));
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

function Photo({ discount, url }) {
    const URL = "https://ik.imagekit.io/bishwarup307/odin-restaurant/";

    const imageDiv = document.createElement("div");
    imageDiv.classList.add(style.imageContainer);

    const photo = document.createElement("img");
    photo.classList.add(style.item__photo);
    photo.src = `${URL}${url}?tr=w-600,h-400`;
    imageDiv.appendChild(photo);

    imageDiv.appendChild(Discount(discount));
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

    const addBtn = document.createElement("button");
    const classNames = commonStyles.btnPrimary.split(" ");
    classNames.forEach((className) => addBtn.classList.add(className));
    addBtn.classList.add(commonStyles.btnSmall);
    addBtn.classList.add(style.addBtn);
    addBtn.id = item.id;
    addBtn.textContent = "ADD";
    titleDiv.appendChild(addBtn);

    addBtn.addEventListener("click", () => {
        console.log(`${item.name} added to cart.`);
    });

    return titleDiv;
}
