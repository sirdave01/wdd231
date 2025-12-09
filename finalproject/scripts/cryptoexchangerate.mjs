
import { EXCHANGE_RATE_KEY } from './apis.mjs';

export async function initCrypto() {
    // === CRYPTO PRICES (CoinGecko - BTC, ETH, BNB) ===
    try {
        // Full list of CoinGecko IDs for your coins (comma-separated, lowercase)
        const allCoinIds = 'bitcoin,ethereum,binancecoin,litecoin,ripple,cardano,solana,polkadot,dogecoin,shiba-inu,tron,wakanda-inu';  // 12 coins — Xvotes skipped (not listed)

        // Batch into groups of 10 (CoinGecko free limit)
        const batches = [];
        const idArray = allCoinIds.split(',');
        for (let i = 0; i < idArray.length; i += 10) {
            batches.push(idArray.slice(i, i + 10).join(','));
        }

        // Fetch each batch and merge data
        const allData = {};
        for (const batch of batches) {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${batch}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true`
            );

            if (!response.ok) throw new Error(`Batch failed: ${response.status}`);

            const batchData = await response.json();
            Object.assign(allData, batchData);
        }

        const pricesDiv = document.getElementById('crypto-prices');
        let html = '<h3>Top Crypto Live Prices (CoinGecko)</h3>';

        // Your coinMap (updated Wakanda Inu ID; commented Xvotes)
        const coinMap = [
            { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
            { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
            { id: 'binancecoin', name: 'BNB', symbol: 'BNB' },
            { id: 'litecoin', name: 'Litecoin', symbol: 'LTC' },
            { id: 'ripple', name: 'Ripple', symbol: 'XRP' },
            { id: 'cardano', name: `Cardano`, symbol: `ADA` },
            { id: 'solana', name: `Solana`, symbol: `SOL` },
            { id: 'polkadot', name: `Polkadot`, symbol: `DOT` },
            { id: 'dogecoin', name: `Dogecoin`, symbol: `DOGE` },
            { id: 'shiba-inu', name: `Shiba Inu`, symbol: `SHIB` },
            // { id: 'Xvotes', name: `Xvotes`, symbol: `XVT` },  // Skipped: Not on CoinGecko (use 'votes' if you want the inactive one)
            { id: 'tron', name: `Tron`, symbol: `TRX` },
            { id: 'wakanda-inu', name: 'Wakanda Inu', symbol: 'WKD' }  // Fixed ID
        ];

        coinMap.forEach(coin => {
            if (!allData[coin.id]) {
                console.warn(`No data for ${coin.name} — skipping`);
                return;  // Skip gracefully if no data
            }

            const price = allData[coin.id].usd;
            const change = allData[coin.id].usd_24h_change || 0;
            const changeColor = change > 0 ? 'lime' : 'red';
            const arrow = change > 0 ? '↑' : '↓';

            html += `
            <div class="crypto-item">
                <strong>${coin.name} (${coin.symbol})</strong><br>
                $${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                <small style="color: ${changeColor};">${arrow} ${Math.abs(change).toFixed(2)}%</small>
            </div>
        `;
        });

        pricesDiv.innerHTML = html;

    } catch (error) {
        console.error('CoinGecko fetch error:', error);
        document.getElementById('crypto-prices').innerHTML = '<p>Live crypto prices temporarily unavailable</p>';
    }

    // === Multi-Currency Exchange Rates (USD base) ===
    try {
        const rate = await fetch(`https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_KEY}/latest/USD`)
            .then(r => r.json());

        const currencies = { NGN: '₦', EUR: '€', GBP: '£', KWD: 'د.ك', CAD: 'C$', JPY: '¥' };
        let html = '<h3>Live Exchange Rates</h3><div class="rates-grid">';
        for (const [code, symbol] of Object.entries(currencies)) {
            const value = rate.conversion_rates[code];
            html += `<div><strong>1 USD = ${symbol}${value.toLocaleString()}</strong> ${code}</div>`;
        }
        html += '</div>';
        document.getElementById('usd-ngn').innerHTML = html;
    } catch (e) {
        document.getElementById('usd-ngn').textContent = 'Rates unavailable';
    }
}