// import functions from other modules into all.mjs

import { initThankYou } from "./thanks.mjs";

import { initDarkMode } from "./darkmode.mjs";

import { initFooterDate } from "./footer-date.mjs";

import { initHamburger } from "./hamburger.mjs";

import { initWayFinding } from "./wayFinding.mjs";

import { initWeather } from "./weather.mjs";

import { initLiveClock } from "./liveclock.mjs";

import { initCrypto } from "./cryptoexchangerate.mjs";
// event listener to load the initThankYou function when the DOM content is fully loaded
document.addEventListener(`DOMContentLoaded`, () => {
    initThankYou();
    initDarkMode();
    initFooterDate();
    initHamburger();
    initWayFinding();
    initLiveClock();

    if (document.querySelector('.weather, #current-weather')) {
        initWeather();
    }

    if (document.querySelector(`#crypto-prices`) || document.querySelector(`#usd-ngn`)) {
        initCrypto();
    }
});