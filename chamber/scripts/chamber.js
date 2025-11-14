// creating a responsive hamburger button for the small screens
// using DOM to manipulate the HTML contents and 
// adding eventlistener for click reaction for the hamburger menu

const navButton = document.querySelector(`#nav-btn`);
const navlinks = document.querySelector(`#nav-list`);

navButton.addEventListener(`click`, () => {
    navButton.classList.toggle(`show`);
    navlinks.classList.toggle(`show`);
})

let allMembers = [];
let currentView = 'grid';

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

        lastEdited.textContent = `Last Modified: ${new Date(document.lastModified).toLocaleString()}`
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

// view toggle for the Directory Page

function initViewSwitch() {

    const gridButton = document.querySelector('#grid');
    const listButton = document.querySelector('#list');
    const container = document.querySelector(`#members-container`);

    if (!gridButton || !listButton || !container) return;

    function updateView(view) {
        currentView = view;
        gridButton.classList.toggle('active', view === 'grid');
        listButton.classList.toggle('active', view === 'list');
        container.classList.toggle('grid-view', view === 'grid');
        container.classList.toggle('list-view', view === 'list');
        displayMembers(); // Re-render to apply view-specific HTML
    }

    gridButton.addEventListener('click', () => updateView('grid'));

    listButton.addEventListener('click', () => updateView('list'));

    // Set initial view
    updateView('grid');
}

// fetch and render membeer data from JSON file for directory page

async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        allMembers = await response.json();
        renderMembers(allMembers);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        document.querySelector('#members-container').innerHTML = '<p>Failed to load member data.</p>';
    }
}

function renderMembers(members) {
    const container = document.querySelector('#members-container');
    const searchInput = document.querySelector('#search-input');

    if (!container || !searchInput) return;

    // initial display
    displayMembers();

    // add event listener for search input
    if (searchInput) {
        searchInput.addEventListener('input', displayMembers);
    }
}

function displayMembers() {
    const container = document.querySelector('#members-container');
    const searchInput = document.querySelector('#search-input');
    if (!container || !searchInput) return;

    const filtered = allMembers.filter(member =>
        member.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        member.Info.toLowerCase().includes(searchInput.value.toLowerCase())
    );

    container.innerHTML = filtered.map(member => {
        // Extract year from Info (last 4-digit number or N/A)
        const yearMatch = member.Info.match(/\d{4}/);
        const year = yearMatch ? yearMatch[0] : 'N/A';

        // Website handling
        const websiteUrl = member.website !== 'N/A' ? (member.website.startsWith('http') ? member.website : 'https://' + member.website) : '#';
        const websiteHtml = member.website !== 'N/A' ?
            `<p class="member-website"><strong>Website:</strong> <a href="${websiteUrl}" target="_blank" rel="noopener">${member.website}</a></p>` :
            '<p class="member-website"><strong>Website:</strong> N/A</p>';

        // Details link (uses website if available, else dummy) - only for list
        const detailsHtml = currentView === 'list' ? `<a class="member-details" href="${websiteUrl}">See Details</a>` : '';

        if (currentView === 'grid') {
            return `
                <article class="member-card">
                    <h3 class="member-name">${member.name}</h3>
                    <span class="member-badge level-badge">Level ${member.membershipLevel} ${getLevelName(member.membershipLevel)}</span>
                    <p class="member-year">${year}</p>
                    <p class="member-address"><strong>Address:</strong> ${member.address}</p>
                    <p class="member-phone"><strong>Phone:</strong> ${member.phoneNumber}</p>
                    ${websiteHtml}
                    <p class="member-info">${member.Info}</p>
                </article>
            `;
        } else {
            return `
                <article class="member-card">
                    <h3 class="member-name">${member.name}</h3>
                    <p class="member-year">${year}</p>
                    ${detailsHtml}
                </article>
            `;
        }
    }).join('');
}

function getLevelName(membershipLevel) {
    return membershipLevel === 1 ? `member` : membershipLevel === 2 ? `silver` : membershipLevel === 3 ? `gold` : ``;
}












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

// eventlistener for all the functions to load when the DOM content is fully loaded
document.addEventListener(`DOMContentLoaded`, () => {
    initDarkMode();
    initViewSwitch();
    loadMembers();
});