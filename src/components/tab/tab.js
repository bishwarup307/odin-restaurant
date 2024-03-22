import styles from "./tab.module.css";
import commonStyles from "../../common.module.css";

const menuSvg = `<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 45.001 45.001" xml:space="preserve" class=${styles.icon}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M43.604,41.146c0.703,0.64,0.945,2.207,0.037,3.107c-0.902,0.909-2.472,0.668-3.109-0.034 c-5.893-6.328-11.783-12.659-17.676-18.989l-0.67-0.715c-6.164,6.618-12.326,13.239-18.488,19.86 c-0.635,0.701-2.202,0.943-3.104,0.034c-0.91-0.901-0.67-2.472,0.032-3.109c6.642-6.178,13.279-12.358,19.92-18.539 c0,0-3.214-3.467-4.6-4.955c-3.243,2.325-8.049,1.441-10.938-2.126C1.901,11.917-0.779,5.187,1.815,2.431 c2.759-2.596,9.485,0.09,13.248,3.194c3.566,2.892,4.455,7.691,2.125,10.936c1.67,1.556,3.34,3.108,5.012,4.663 c-0.004,0.003-0.006,0.005-0.01,0.008c0,0,0.104,0.082,0.01-0.008c1.562-1.455,3.125-2.909,4.688-4.364 c-1.32-2.254-0.443-5.415,1.701-7.219c2.459-2.061,11.57-9.883,11.815-9.635c0.244,0.243-6.146,6.281-10.415,10.563l0.712,0.711 c4.557-3.994,10.99-9.984,11.238-9.74c0.244,0.245-5.946,6.48-10.076,10.905l0.707,0.705C36.988,9.017,43.225,2.826,43.467,3.069 c0.245,0.246-5.746,6.68-9.74,11.237l0.707,0.706c4.28-4.269,10.315-10.659,10.562-10.417c0.247,0.246-9.618,11.805-9.632,11.822 c-0.002-0.002,2.094-2.462-0.008-0.006c-2.006,2.347-5.002,3.057-7.217,1.705c-1.438,1.543-2.873,3.086-4.309,4.629 C23.704,22.626,37.014,35.013,43.604,41.146z"></path> </g> </g></svg>`;

const cartSvg = `<svg class=${styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;

const profileSvg = `<svg viewBox="0 0 24 24" class=${styles.icon} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="10" cy="6" r="4" stroke-width="1.5"></circle> <path d="M21 10H19M19 10H17M19 10L19 8M19 10L19 12" stroke-width="1.5" stroke-linecap="round"></path> <path d="M17.9975 18C18 17.8358 18 17.669 18 17.5C18 15.0147 14.4183 13 10 13C5.58172 13 2 15.0147 2 17.5C2 19.9853 2 22 10 22C12.231 22 13.8398 21.8433 15 21.5634" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>`;

export default function Tab() {
    let activeItem;
    const tab = document.createElement("div");
    tab.classList.add(styles.tab);

    function offsetMenuBorder(element, menuBorder) {
        // console.log(element);
        const offsetActiveItem = element.getBoundingClientRect();
        console.log(offsetActiveItem);
        const left =
            Math.floor(
                offsetActiveItem.left -
                    tab.offsetLeft -
                    (border.offsetWidth - offsetActiveItem.width) / 2
            ) + "px";
        menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;
    }

    function clickItem(item) {
        if (activeItem === item) return;

        if (activeItem) {
            activeItem.classList.remove(styles.active);
        }

        item.classList.add(styles.active);

        activeItem = item;
        offsetMenuBorder(activeItem, border);
    }

    const buttons = [
        Button(menuSvg),
        Button(cartSvg, "cart"),
        Button(profileSvg),
    ];

    buttons.forEach((button) => {
        tab.appendChild(button);
        button.addEventListener("click", () => clickItem(button));
    });

    const border = document.createElement("div");
    border.classList.add(styles.border);
    tab.appendChild(border);

    document.addEventListener("DOMContentLoaded", () => {
        activeItem = buttons[0];
        activeItem.classList.add(styles.active);
        offsetMenuBorder(activeItem, border);
    });

    return tab;
}

function Button(iconSvg, ...classNames) {
    const btn = document.createElement("button");
    btn.classList.add(styles.tabItem);
    // if (active) btn.classList.add(styles.active);

    classNames.forEach((className) => {
        btn.classList.add(styles[className]);
    });
    btn.innerHTML = iconSvg;

    return btn;
}
