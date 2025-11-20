// view toggle for the Directory Page

let allMembers = [];
let currentView = 'grid';

async function initDirectory() {
    initViewSwitch();
    await loadMembers();
}

function initViewSwitch() {
    const gridBtn = document.querySelector('#grid');
    const listBtn = document.querySelector('#list');
    const container = document.querySelector('#members-container');

    if (!gridBtn || !listBtn || !container) return;

    const update = (view) => {
        currentView = view;
        gridBtn.classList.toggle('active', view === 'grid');
        listBtn.classList.toggle('active', view === 'list');
        container.classList.toggle('grid-view', view === 'grid');
        container.classList.toggle('list-view', view === 'list');
        displayMembers();
    };

    gridBtn.addEventListener('click', () => update('grid'));
    listBtn.addEventListener('click', () => update('list'));
    update('grid');
}

async function loadMembers() {
    try {
        const res = await fetch('data/members.json');
        allMembers = await res.json();
        displayMembers();

        const search = document.querySelector('#search-input');
        if (search) search.addEventListener('input', displayMembers);
    } catch (e) {
        document.querySelector('#members-container').innerHTML = '<p>Failed to load members.</p>';
    }
}

function getLevelName(level) {
    if (level === 3) return 'Gold';
    if (level === 2) return 'Silver';
    if (level === 1) return 'Member';
    return 'Member';
}

function displayMembers() {
    const container = document.querySelector('#members-container');
    const searchVal = document.querySelector('#search-input')?.value.toLowerCase() || '';

    const filtered = allMembers.filter(m =>
        m.name.toLowerCase().includes(searchVal) ||
        (m.Info && m.Info.toLowerCase().includes(searchVal))
    );

    container.innerHTML = filtered.map(m => {
        const year = m.Info?.match(/\d{4}/)?.[0] || 'N/A';
        const site = m.website && m.website !== 'N/A'
            ? (m.website.startsWith('http') ? m.website : 'https://' + m.website)
            : '#';
        const siteHtml = m.website && m.website !== 'N/A'
            ? `<p><strong>Website:</strong> <a href="${site}" target="_blank">${m.website}</a></p>`
            : '';

        const levelText = getLevelName(m.membershipLevel);

        if (currentView === 'grid') {
            return `<article class="member-card">
                <h3>${m.name}</h3>
                <span class="level-badge">Level ${m.membershipLevel} ${levelText}</span>
                <p><strong>Founded:</strong> ${year}</p>
                <p><strong>Address:</strong> ${m.address}</p>
                <p><strong>Phone:</strong> ${m.phoneNumber}</p>
                ${siteHtml}
                <p>${m.Info || ''}</p>
            </article>`;
        } else {
            return `<article class="member-card">
                <h3>${m.name}</h3>
                <p>${year}</p>
                <a class="member-details" href="${site}">See Details →</a>
            </article>`;
        }
    }).join('');
}

export { initDirectory };