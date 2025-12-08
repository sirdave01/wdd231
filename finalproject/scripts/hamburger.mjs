// creating a responsive hamburger button for the small screens
// using DOM to manipulate the HTML contents and 
// adding eventlistener for click reaction for the hamburger menu

export function initHamburger() {
    const navButton = document.querySelector(`#nav-btn`);
    const navlinks = document.querySelector(`#nav-list`);

    if (!navButton || !navlinks) return;

    navButton.addEventListener(`click`, () => {
        navButton.classList.toggle(`show`);
        navlinks.classList.toggle(`show`);
    })

    navButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navButton.classList.toggle('show');
            navlinks.classList.toggle('show');
        }
    });
};
