// creating a responsive hamburger button for the small screens
// using DOM to manipulate the HTML contents and 
// adding eventlistener for click reaction for the hamburger menu

const navButton = document.querySelector(`#nav-btn`);
const navlinks = document.querySelector(`#nav-bar`);

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

    links.forEach(link => {
        if (link.getAttribute(`href`) === activePage) {
            link.classList.add(`current`);
        }
    });
});