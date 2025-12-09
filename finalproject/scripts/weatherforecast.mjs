import { OPENWEATHER_KEY } from "./apis.mjs";

const UNITS = 'metric';
const lon = '7.3667';
const lat = '5.1167';

async function initWeather() {
    const currentEl = document.querySelector(`#current-weather`);
    const forecastEl = document.querySelector(`#forecast`);
    if (!currentEl) return;

    try {
        const cur = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}&units=${UNITS}`).then(r => r.json());
        currentEl.innerHTML = `
            <figure>
                <img src="https://openweathermap.org/img/wn/${cur.weather[0].icon}@2x.png" alt="${cur.weather[0].description}">
                <figcaption>${Math.round(cur.main.temp)}°C — ${cur.weather[0].description}</figcaption>
            </figure>`;

        // foercasting the next 3 days weather in Aba using its longitude and latitiude

        const fore = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}&units=${UNITS}`).then(r => r.json());

        // **adding check for valid response**
        if (!fore.list || fore.list.length === 0) {
            throw new Error('No forecast data available');
        }

        const daily = fore.list.filter(i => i.dt_txt.includes('12:00:00')).slice(0, 3);

        forecastEl.innerHTML = `<h3>3-Day Forecast</h3><div class="forecast-grid">
            ${daily.map(d => `
                <div class="day">
                    <p>${new Date(d.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <img src="https://openweathermap.org/img/wn/${d.weather[0].icon}.png" alt="${d.weather[0].description}">
                    <p>${Math.round(d.main.temp)}°C</p>
                </div>`).join('')}
        </div>`;

    } catch (e) {
        currentEl.innerHTML = '<p>Weather unavailable</p>';
        forecastEl.innerHTML = '<p>Forecast unavailable</p>';
        console.error('Weather fetch error:', e);  // **To debug in browser console**
    }
}

export { initWeather };