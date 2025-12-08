// creating the script code for the thanks.hml to dunamically
// populate and display the submitted information of users

export function initThankYou() {
    const userInfo = new URLSearchParams(window.location.search);
    document.querySelector(`.form-result`).innerHTML = `
    <p>Email submission from: ${userInfo.get(`fullname`)}</p>
    <p>User's Email: ${userInfo.get(`email`)}</p>
    <p>User's choice (freelancing): ${userInfo.get(`freelancing`)}</p>
    <p>User's choice (inquiries): ${userInfo.get(`inquiries`)}</p>
    <p>User's choice (partnership): ${userInfo.get(`partnership`)}</p>
    <p>User's choice (enroll-for-training): ${userInfo.get(`enroll-for-training`)}</p>
    <p>User's message: ${userInfo.get(`message`)}</p>
    `
};