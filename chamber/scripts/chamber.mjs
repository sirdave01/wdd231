// import the functions from the other modules into the chamber.mjs

import { initHamburger } from "./hamburger.mjs";

import { initFooterDate } from "./footer-date.mjs";

import { initWayFinding } from "./wayFinding.mjs";

import { initDarkMode } from "./darkmode.mjs";

import { initDirectory } from "./directory.mjs";

import { initSpotlights } from "./spotlights.mjs";

import { initWeather } from "./weather.mjs";





// eventlistener for all the functions to load when the DOM content is fully loaded
document.addEventListener(`DOMContentLoaded`, () => {
    initHamburger();
    initDarkMode();
    initFooterDate();
    initWayFinding();

    // Page-specific — safe to load on pages using their container id
    if (document.querySelector('#members-container')) {
        initDirectory();
    }
    if (document.querySelector('#spotlight-container')) {
        initSpotlights();
    }
    if (document.querySelector('.weather, #current-weather')) {
        initWeather();
    }
});