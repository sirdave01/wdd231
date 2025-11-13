// creating a responsive hamburger button for the small screens
// using DOM to manipulate the HTML contents and 
// adding eventlistener for click reaction for the hamburger menu

const navButton = document.querySelector(`#nav-btn`);
const navlinks = document.querySelector(`#nav-list`);

navButton.addEventListener(`click`, () => {
    navButton.classList.toggle(`show`);
    navlinks.classList.toggle(`show`);
})

// creating and eventlistener to dynamically populate the footer of the page's year and last modified date

document.addEventListener(`DOMContentLoaded`, function () {

    // for the current year

    const currentYear = document.querySelector(`#currentyear`);

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();
    }

    // for last modified date

    const lastEdited = document.querySelector(`#lastModified`);

    if (lastEdited) {

        lastEdited.textContent = `Last Modified: ${new Date().toLocaleString()}`
    }
})

// wayfinding, creating current class for any active/current page

document.addEventListener(`DOMContentLoaded`, () => {

    const activePage = window.location.pathname.split(`/`).pop() || `index.html`;
    const links = document.querySelectorAll(`.nav-bar a`);

    links.forEach(link => {
        const linkPage = link.getAttribute(`href`);

        if (linkPage === activePage) {
            link.classList.add(`active`);
        }
    });
});

// dark mode toggle functionality

function initDarkMode() {
    const toggleSwitch = document.querySelector('#dark-mode-toggle');
    if (!toggleSwitch) return;

    // load saved preference
    const currentMode = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', currentMode === 'dark');
    toggleSwitch.textContent = currentMode === 'dark' ? '☀️' : '🌙';

    toggleSwitch.addEventListener('click', toggleDarkMode);
}

function toggleDarkMode() {
    const body = document.body;
    const toggleSwitch = document.querySelector('#dark-mode-toggle');
    const isDarkMode = body.classList.contains('dark-mode');

    body.classList.toggle('dark-mode');
    const newMode = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', newMode);
    toggleSwitch.textContent = newMode === 'dark' ? '☀️' : '🌙';
}

document.addEventListener('DOMContentLoaded', initDarkMode);