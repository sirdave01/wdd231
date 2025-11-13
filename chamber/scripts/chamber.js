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

        lastEdited.textContent = `Last Modified: ${document.lastModified().toLocaleString()}`
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

    const gridButton = document.querySelector('#grid-view');
    const listButton = document.querySelector('#list-view');
    const container = document.querySelector(`#members-container`);

    if (!gridButton || !listButton || !container) return;

    gridButton.addEventListener('click', () => {
        gridButton.classList.add('active');
        container.classList.remove('active');
    });

    listButton.addEventListener('click', () => {
        listButton.classList.add('active');
        container.classList.remove('active');
    });
}

// fetch and render membeer data from JSON file for directory page

async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const members = await response.json();
        renderMembers(members);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        document.querySelector('.members-container').innerHTML = '<p>Failed to load member data.</p>';
    }
}

function renderMembers(members) {
    const container = document.querySelector('#members-container');
    const searchInput = document.querySelector('#search-input');

    if (!container || !searchInput) return;

    function filterAndDisplayMembers() {
        const filtered = members.filter(member =>
            member.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            member.info.toLowerCase().includes(searchInput.value.toLowerCase())
        );
        container.innerHTML = filtered.map(member => `
            <article class="member-card">
                <img src="${member.image} alt="${member.name} Logo" loading="lazy" onerror="this.src='images/icons/default.png';>
                <h3>${member.name}</h3>
                <span class="level-badge">Level ${member.membershipLevel} ${getLevelName(member.membershipLevel)}</span>
                <p><strong>Address:</strong>${member.address}</p>
                <p><strong>Phone:</strong> ${member.phoneNumber}</p>
                <p><strong>Website:</strong> <a href="https://${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
                <p>${member.Info}</p>
            </article>
        `).join('');
    }

    // inital display
    filterAndDisplayMembers();

    // add event listener for search input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => filterAndDisplayMembers(e.target.value));
    }
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
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initViewSwitch();
    loadMembers();
});