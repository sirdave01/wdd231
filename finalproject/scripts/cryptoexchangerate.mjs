//the api keys are stored in apis.mjs which is gitignored and also not shown here for security reasons
import { COINMARKETCAP_KEY } from './apis.mjs';
import { EXCHANGE_RATE_KEY } from './apis.mjs';

export async function initCrypto() {
    // Crypto Prices (BTC, ETH, BNB)
    try {
        const res = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=3&sort=market_cap', {
            headers: { 'X-CMC_PRO_API_KEY': COINMARKETCAP_KEY }
        });
        const data = await res.json();
        const pricesDiv = document.getElementById('crypto-prices');
        if (!pricesDiv) return;

        const top3 = data.data.slice(0, 3);
        pricesDiv.innerHTML = `
            <h3>Top 3 Crypto (Live)</h3>
            ${top3.map(c => `
                <div class="crypto-item">
                    <strong>${c.name} (${c.symbol})</strong><br>
                    $${c.quote.USD.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    <small style="color: ${c.quote.USD.percent_change_24h > 0 ? 'lime' : 'red'}">
                        ${c.quote.USD.percent_change_24h.toFixed(2)}%
                    </small>
                </div>
            `).join('')}
        `;
    } catch (e) {
        document.getElementById('crypto-prices').textContent = 'Crypto unavailable';
    }

    // USD → NGN Exchange Rate
    try {
        const rate = await fetch(`https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_KEY}/latest/USD`)
            .then(r => r.json());
        document.getElementById('usd-ngn').textContent =
            `1 USD = ${rate.conversion_rates.NGN.toLocaleString()} NGN`;
    } catch (e) {
        document.getElementById('usd-ngn').textContent = 'Rate unavailable';
    }
}