// the wayfinding js script that lets users know the active page they're on

function initWayFinding() {

    const activePage = window.location.pathname.split(`/`).pop() || `index.html`;

    document.querySelectorAll(`.nav-bar a`).forEach(link => {
        if (link.getAttribute(`href`) == activePage) {
            link.classList.add(`active`)
        }
    });
}

export { initWayFinding };