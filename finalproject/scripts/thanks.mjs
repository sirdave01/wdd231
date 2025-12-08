// creating the script code for the thanks.hml to dunamically
// populate and display the submitted information of users

export function initThankYou() {
    const userInfo = new URLSearchParams(window.location.search);
    const resultEl = document.querySelector('.form-result');
    if (!resultEl) return;

    let html = '';
    for (const [key, value] of userInfo.entries()) {
        html += `<p>${key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, ' ')}: ${value || 'N/A'}</p>`;
    }
    resultEl.innerText = html || '<p>No data submitted.</p>';
};