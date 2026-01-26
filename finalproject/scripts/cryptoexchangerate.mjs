
import { EXCHANGE_RATE_KEY } from './apis.mjs';

const CACHE_KEY = 'cryptoCache';
const CACHE_DURATION = 60000; // 60 seconds

// Helper: Get cached data with timestamp check
function getCachedData() {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
            return data;
        }
    } catch (e) {
        return null;
    }
    return null;
}

// Helper: Save to cache
function setCachedData(data) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    } catch (e) {
        console.warn("Could not cache crypto data");
    }
}

export async function initCrypto() {
    const pricesDiv = document.getElementById('crypto-prices');
    const ratesDiv = document.getElementById('usd-ngn');

    // === COINGECKO: Use single request + caching ===
    const coinIds = 'bitcoin,ethereum,binancecoin,litecoin,ripple,cardano,solana,polkadot,dogecoin,shiba-inu,tron,wakanda-inu,pax-gold';
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true`;

    const coinMap = [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
        { id: 'binancecoin', name: 'BNB', symbol: 'BNB' },
        { id: 'litecoin', name: 'Litecoin', symbol: 'LTC' },
        { id: 'ripple', name: 'Ripple', symbol: 'XRP' },
        { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
        { id: 'solana', name: 'Solana', symbol: 'SOL' },
        { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
        { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
        { id: 'shiba-inu', name: 'Shiba Inu', symbol: 'SHIB' },
        { id: 'tron', name: 'Tron', symbol: 'TRX' },
        { id: 'wakanda-inu', name: 'Wakanda Inu', symbol: 'WKD' },
        { id: 'pax-gold', name: 'Pax Gold', symbol: 'PAXG' }
    ];

    async function updateCryptoPrices() {
        let data = getCachedData();

        // Try to fetch fresh data
        try {
            const res = await fetch(url, {
                headers: { 'accept': 'application/json' }
            });

            if (res.ok) {
                data = await res.json();
                setCachedData(data);
                pricesDiv.innerHTML = '<small>Live prices (updated just now)</small>';
            } else if (res.status === 429) {
                pricesDiv.innerHTML = '<small>Rate limited – showing cached prices</small>';
            } else {
                throw new Error(`HTTP ${res.status}`);
            }
        } catch (err) {
            console.warn('Crypto fetch failed:', err.message);
            if (!data) {
                pricesDiv.innerHTML = '<p>Live prices temporarily unavailable</p>';
                return;
            } else {
                pricesDiv.innerHTML = '<small>Using cached prices (refresh in a minute)</small>';
            }
        }

        // Render prices (from fresh or cache)
        let html = '<h3>Top Crypto Live Prices</h3>';
        coinMap.forEach(coin => {
            const info = data[coin.id];
            if (!info) return;

            const price = info.usd;
            const change = info.usd_24h_change || 0;
            const color = change > 0 ? 'lime' : 'red';
            const arrow = change > 0 ? '↑' : '↓';

            html += `
                <div class="crypto-item">
                    <strong>${coin.name} (${coin.symbol})</strong><br>
                    $${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                    <small style="color:${color}">${arrow} ${Math.abs(change).toFixed(2)}%</small>
                </div>`;
        });

        pricesDiv.innerHTML = html;
    }

    // Initial load
    await updateCryptoPrices();

    // Update every 60 seconds
    setInterval(updateCryptoPrices, 60000);

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