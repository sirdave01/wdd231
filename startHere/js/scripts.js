//building an advanced form and thank you page after form submission

const myInfo = new URLSearchParams(window.location.search);

document.querySelector(`#results`).innerHTML = `
<p>Appointment for ${myInfo.get(`first`)} ${myInfo.get(`last`)}</p>
<p>Proxy ${myInfo.get(`ordinance`)} on ${myInfo.get(`date`)} in the ${myInfo.get(`location`)}</p>
<p>Your Phone ${myInfo.get(`phone`)}</p>
<p>Your Email is ${myInfo.get(`email`)}</p>`