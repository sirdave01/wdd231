// import functions from other modules into all.mjs

import { initThankYou } from "./thanks.mjs";

// event listener to load the initThankYou function when the DOM content is fully loaded
document.addEventListener(`DOMContentLoaded`, () => {
    initThankYou();
});