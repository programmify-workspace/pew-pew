const navLinks = document.getElementById("nav-links");
const menuBtn = document.getElementById("menu-btn");
const menuBtnIcon = menuBtn.querySelector("i");

// Toggle navigation menu on menu button click
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute(
        "class",
        isOpen ? "ri-close-line" : "ri-menu-3-line"
    );
});

// Close navigation menu when a link is clicked
navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
        menuBtnIcon.setAttribute("class", "ri-menu-3-line");
    }
});

const scrollRevealOptions = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
};

// Scroll reveal animations
const sectionsToAnimate = [
    { selector: ".header__content h1", delay: 0 },
    { selector: ".header__content .section__description", delay: 500 },
    { selector: ".header__btn", delay: 1000 }, // Assuming .header__btn is the correct selector
    { selector: ".about__content .section__header", delay: 0 },
    { selector: ".about__content .section__description", delay: 500 },
    { selector: ".about__btn", delay: 1000 }, // Assuming .about__btn is the correct selector
    { selector: ".service__card", delay: 1000 },
    { selector: ".portfolio__card", duration: 1000, interval: 500 },
];

sectionsToAnimate.forEach(({ selector, ...options }) => {
    ScrollReveal().reveal(selector, {
        ...scrollRevealOptions,
        ...options,
    });
});