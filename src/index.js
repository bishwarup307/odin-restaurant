import style from "./common.module.css";
import logoPng from "./assets/logo-color.png";
import Menu from "./components/menu/menu.js";
import Tab from "./components/tab/tab.js";

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
    // orderNowBtn.classList.add(style["btn-primary"]);
    orderNowBtn.classList.add(style["btn-xl"]);
    heroText.appendChild(orderNowBtn);

    hero.appendChild(heroText);

    return hero;
}

const body = document.querySelector("#root");

body.classList.add(style.root);

body.appendChild(Hero());
body.appendChild(Tab());
body.appendChild(Menu());
