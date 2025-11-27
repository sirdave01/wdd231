// scripts/thankyou.mjs
// Displays submitted form data from URL parameters

function initThankYou() {
    const allInfo = new URLSearchParams(window.location.search);

    document.querySelector(`#submitted-data`).innerHTML = `
    <p><strong>Submission of:</strong> ${allInfo.get(`firstname`)} ${allInfo.get(`lastname`)}</p>
    <p><strong>Email:</strong> ${allInfo.get(`email`)}</p>
    <p><strong>Position of:</strong> ${allInfo.get(`title`)}</p>
    <p><strong>Phone:</strong> ${allInfo.get(`phone`)}</p>
    <p><strong>Business Name:</strong> ${allInfo.get(`businessname`)}</p>
    <p><strong>Membership level of:</strong> ${allInfo.get(`membership`)}</p>
    <p><strong>Business Description:</strong> ${allInfo.get(`description`)}</p>
    <p><Form SUbmission Time:</strong> ${allInfo.get(`timestamp`)}</p>`
}

export { initThankYou };