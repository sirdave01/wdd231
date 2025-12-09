
export async function initServices() {

    const featuredContainer = document.querySelector(`#featured-projects`);

    const allContainer = document.querySelector(`#all-projects`);

    try {
        const res = await fetch('scripts/data/projects.json');
        const data = await res.json();

        const renderCard = (p) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.style.cursor = 'pointer';

            // Clean tech array: split, trim, filter empty
            const techArray = (p.tech || [])
                .map(t => t.trim())
                .filter(t => t.length > 0);

            // Store clean data for modal
            card.dataset.title = p.title;
            card.dataset.desc = p.desc || 'No description.';
            card.dataset.tech = techArray.join(',' || ' ');
            card.dataset.demo = p.demo || '#';
            card.dataset.repo = p.repo || '#';

            card.innerHTML = `
                <h3>${p.title}</h3>
                <p>${p.desc || ''}</p>
                <div class="tags">
                    ${techArray.map(t => `<span class="badge">${t}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${p.demo ? `<a href="${p.demo}" target="_blank" class="btn" onclick="event.stopPropagation()">${p.type === 'live' ? 'View Live' : 'View Demo'}</a>` : ''}
                    ${p.repo ? `<a href="${p.repo}" target="_blank" class="btn secondary" onclick="event.stopPropagation()">View Code</a>` : ''}
                </div>
            `;

            return card;
        };

        // Render featured projects (index.html)
        if (featuredContainer && data.featured) {
            data.featured.forEach(p => {
                featuredContainer.appendChild(renderCard(p));
            });
        }

        // Render all projects (services.html)
        if (allContainer && data.allProjects) {
            data.allProjects.forEach(p => {
                allContainer.appendChild(renderCard(p));
            });
        }

    } catch (err) {
        console.error('Failed to load data.json:', err);
        const msg = document.createElement('p');
        msg.textContent = 'Projects failed to load. Check console.';
        document.getElementById('featured-projects')?.appendChild(msg);
    }
}