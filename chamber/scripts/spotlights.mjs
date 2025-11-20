
async function initSpotlights() {
    const container = document.getElementById('spotlight-container');
    if (!container) return;

    try {
        const res = await fetch('data/members.json');
        const members = await res.json();

        const eligible = members.filter(m => m.membershipLevel >= 2);
        const shuffled = eligible.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);

        container.innerHTML = selected.map(m => `
            <div class="spotlight-card">
                <h3>${m.name}</h3>
                <p class="level">${m.membershipLevel === 3 ? 'Gold' : 'Silver'} Member</p>
                <p>${m.address}</p>
                <p>${m.phoneNumber}</p>
                <a href="${m.website.startsWith('http') ? m.website : 'https://' + m.website}" target="_blank">Visit Website →</a>
            </div>
        `).join('');

    } catch (e) {
        container.innerHTML = '<p>Spotlights temporarily unavailable.</p>';
    }
}

export { initSpotlights };