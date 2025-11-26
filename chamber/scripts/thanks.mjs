// scripts/thankyou.mjs
// Displays submitted form data from URL parameters

function initThankYou() {
    const params = new URLSearchParams(window.location.search);

    const levelMap = {
        np: 'NP Membership (Non-Profit – Free)',
        bronze: 'Bronze Membership',
        silver: 'Silver Membership',
        gold: 'Gold Membership'
    };

    const fields = ['firstname', 'lastname', 'email', 'phone', 'businessname', 'membership', 'timestamp'];

    fields.forEach(field => {
        const el = document.getElementById(`out-${field}`);
        if (!el) return;

        let value = params.get(field) || 'N/A';

        if (field === 'membership') {
            value = levelMap[value] || 'Not selected';
        }

        if (field === 'timestamp' && value !== 'N/A') {
            value = new Date(value).toLocaleString();
        }

        el.textContent = value;
    });
}

export { initThankYou };