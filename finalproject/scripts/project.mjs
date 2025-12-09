// import functions from other modules into all.mjs

import { initLiveClock } from "./liveclock.mjs";

import { initCrypto } from "./cryptoexchangerate.mjs";

import { initThankYou } from "./realThanks.mjs";

import { initDarkMode } from "./modetoggle.mjs";

import { initWayFinding } from "./activepage.mjs";

import { initWeather } from "./weatherforecast.mjs";

import { initHamburger } from "./hambutton.mjs";

import { initFooterDate } from "./footer.mjs";

// event listener to load the initThankYou function when the DOM content is fully loaded
document.addEventListener(`DOMContentLoaded`, () => {
    initLiveClock();
    initCrypto();
    initThankYou();
    initDarkMode();
    initWayFinding();
    initWeather();
    initHamburger();
    initFooterDate();
});