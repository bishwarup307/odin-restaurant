import style from "./common.module.css";
import logoPng from "./assets/logo-color.png";
import Menu from "./components/menu/menu.js";
import Tab from "./components/tab/tab.js";
import CartGrid from "./components/cart/cart.js";
import Cart from "./components/backend.js";
import Profile from "./components/profile/profile.js";

let active = "switch-menu";

function Hero() {
    const hero = document.createElement("div");
    hero.className = style.hero;

    const heroText = document.createElement("div");
    heroText.classList.add(style.hero_text);

    const logo = document.createElement("img");
    logo.classList.add(style.logo);
    logo.src = logoPng;
    logo.alt = "logo";
    heroText.appendChild(logo);

    const subtitle = document.createElement("p");
    subtitle.textContent =
        "Food is never the same. Discover new taste everyday with our mouth-watering dishes.";
    subtitle.classList.add(style["hero-subtitle"]);
    heroText.appendChild(subtitle);

    const orderNowBtn = document.createElement("button");
    orderNowBtn.textContent = "Order Now";
    const classNames = style.btnPrimary.split(" ");
    classNames.forEach((className) => orderNowBtn.classList.add(className));
    orderNowBtn.classList.add(style["btn-xl"]);
    heroText.appendChild(orderNowBtn);

    hero.appendChild(heroText);

    return hero;
}

const body = document.querySelector("#root");
body.classList.add(style.root);
body.appendChild(Hero());

const { tab, updateCartNotificationIcon } = Tab();

document.addEventListener("DOMContentLoaded", () =>
    updateCartNotificationIcon(Cart.getNumberOfItems())
);
export { updateCartNotificationIcon };

body.appendChild(tab);

tab.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const btnId = btn.id;

    if (btnId === active) return;

    body.removeChild(body.lastChild);

    switch (btnId) {
        case "switch-menu":
            active = "switch-menu";
            body.appendChild(Menu());
            break;
        case "switch-cart":
            active = "switch-cart";
            const { cartContent, updateCartDisplay } = CartGrid();
            body.appendChild(cartContent);
            updateCartDisplay();
            break;

        case "switch-profile":
            active = "switch-profile";
            body.appendChild(Profile());
            break;
    }
});
body.appendChild(Menu());
