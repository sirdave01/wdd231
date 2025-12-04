import { attractions } from "../data/attractions.mjs";

export function initDiscover() {

    const grid = document.querySelector(".discover-grid");

    const messageEl = document.getElementById("visit-message");

    if (!grid) return; // If it's not on discover page → do nothing

    // === Last Visit Message ===

    const now = Date.now();
    const lastVisit = localStorage.getItem("abaDiscoverVisit");

    if (!lastVisit) {
        messageEl.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysAgo = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysAgo === 0) {
            messageEl.textContent = "Back so soon! Awesome!";
        } else {
            messageEl.textContent = `You last visited ${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago.`;
        }
    }
    localStorage.setItem("abaDiscoverVisit", now);

    // === Build the 8 cards ===
    attractions.forEach((attraction) => {

        const card = document.createElement("article");

        card.className = "discover-card";

        card.innerHTML = `
            <h2>${attraction.name}</h2>
            <figure>
                <img src="images/${attraction.image}" 
                     alt="${attraction.name}" 
                     loading="lazy"
                     width="300" height="200">
            </figure>
            <address>${attraction.address}</address>
            <p>${attraction.description}</p>
            <button>Learn More</button>
        `;

        grid.appendChild(card);
    });

    document.querySelectorAll('.discover-grid img[loading="lazy"]').forEach(img => {
        if (img.complete && img.naturalWidth > 0) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('loaded'));
        }
    });
}