document.addEventListener('DOMContentLoaded', () => {
const projects = document.getElementById("Projects");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("#navbarLinks");
// const submit = document.getElementById("submit");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))



    // Fetch and display projects data
    const fetchData = async () => {
        const response = await fetch('http://localhost:300/projects');
        const data = await response.json();
        data.forEach(data => {
            const div = document.createElement('div');
            div.innerHTML = `
                <h2>${data.name}</h2>
                <p>${data.about}</p>
                <a href="${data.link}">Visit website</a>
            `;
                projects.appendChild(div);
        });
    };
    fetchData();
});