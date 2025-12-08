// scripts/weather.mjs

import { OPENWEATHER_KEY } from './apis.mjs';

// Correct coordinates for Aba, Abia State, Nigeria
const LAT = '5.1167';
const LON = '7.3667';
const UNITS = 'metric';

export async function initWeather() {
    const currentEl = document.querySelector('#current-weather');
    const forecastEl = document.querySelector('#forecast');

    // If we're not on a page with weather elements, just exit
    if (!currentEl && !forecastEl) return;

    try {
        // Current Weather
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${OPENWEATHER_KEY}&units=${UNITS}`
        );
        const current = await currentResponse.json();

        if (currentEl) {
            currentEl.innerHTML = `
                <figure>
                    <img src="https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png" 
                         alt="${current.weather[0].description}" loading="lazy">
                    <figcaption>
                        <strong>${Math.round(current.main.temp)}°C</strong> in Aba<br>
                        ${current.weather[0].description.charAt(0).toUpperCase() + current.weather[0].description.slice(1)}
                    </figcaption>
                </figure>
            `;
        }

        // 3-Day Forecast
        if (forecastEl) {
            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${OPENWEATHER_KEY}&units=${UNITS}`
            );
            const forecast = await forecastResponse.json();

            // Get one forecast per day at noon (12:00:00)
            const dailyForecasts = forecast.list
                .filter(item => item.dt_txt.includes('12:00:00'))
                .slice(0, 3);

            forecastEl.innerHTML = `
                <h3>3-Day Forecast</h3>
                <div class="forecast-grid">
                    ${dailyForecasts.map(day => `
                        <div class="day">
                            <p>${new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" 
                                 alt="${day.weather[0].description}" loading="lazy">
                            <p><strong>${Math.round(day.main.temp)}°C</strong></p>
                            <small>${day.weather[0].description}</small>
                        </div>
                    `).join('')}
                </div>
            `;
        }

    } catch (error) {
        console.error('Weather API failed:', error);
        if (currentEl) currentEl.innerHTML = '<p>Weather data unavailable</p>';
        if (forecastEl) forecastEl.innerHTML = '<p>Forecast unavailable</p>';
    }
}