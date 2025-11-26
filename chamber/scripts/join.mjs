// scripts/join.mjs
// Handles timestamp, card animation on load, and membership modals

function initJoinPage() {
    // Set hidden timestamp on page load
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Animate membership cards on initial load
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + index * 150);
    });

    // Modal functionality
    document.querySelectorAll('[data-modal]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) modal.classList.add('show');
        });
    });

    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').classList.remove('show');
        });
    });

    // Close modal when clicking backdrop
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', e => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    });
}

export { initJoinPage };