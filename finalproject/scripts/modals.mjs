
function initModals() {
    
    const modal = document.querySelector(`#projectModal`);
    if (!modal) return;

    const titleEl = modal.querySelector(`#modal-title`);
    const descEL = modal.querySelector(`#modal-desc`);
    const techEL = modal.querySelector(`#modal-tech`);
    const demoEL = modal.querySelector(`#modal-demo`);
    const repoEL = modal.querySelector(`#modal-repo`);

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', e => {
            if (e.target.closest('a')) return; // don't open modal if clicking a link

            const data = {
                title: card.dataset.title || card.querySelector('h3')?.textContent,
                desc: card.dataset.desc || card.querySelector('p')?.textContent || '',
                tech: (card.dataset.tech?.split(',') || []).filter(Boolean),
                demo: card.dataset.demo || '#',
                repo: card.dataset.repo || '#'
            };

            titleEl.textContent = data.title;
            descEl.textContent = data.desc;
            techEl.innerHTML = data.tech.map(t => `<span class="badge">${t.trim()}</span>`).join('');

            demoEl.style.display = data.demo && data.demo !== '#' ? 'inline-block' : 'none';
            demoEl.href = data.demo;

            repoEl.style.display = data.repo && data.repo !== '#' ? 'inline-block' : 'none';
            repoEl.href = data.repo;

            modal.showModal();
        });
    });

    // Close handlers
    document.querySelector('.close-btn')?.addEventListener('click', () => modal.close());
    modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.close(); });
}

export { initModals };
