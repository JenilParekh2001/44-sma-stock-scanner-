const scannerData = [
  {
    ticker: "MSFT",
    company: "Microsoft Corporation",
    market: "USA",
    price: 492.88,
    fundamentalScore: 94,
    technicalScore: 92,
    sma44: 487.2,
    volumeRatio: 1.62,
    signal: "Buy",
    buyAbove: 496.5,
    stopLoss: 478.4,
    target1: 514.6,
    target2: 532.7,
    target3: 551.2,
    support: 486.8,
    resistance: 505.9,
    rr: 2.1,
    explanation:
      "Price pulled back close to the rising 44 SMA and buyers defended the level with a green candle. Volume is stronger than normal, showing fresh demand.",
    strategy:
      "Buy only above the trigger level. Keep the stop below the 44 SMA support area. Take partial profit near Target 1 and trail the rest if price continues higher."
  },
  {
    ticker: "AAPL",
    company: "Apple Inc.",
    market: "USA",
    price: 212.4,
    fundamentalScore: 89,
    technicalScore: 88,
    sma44: 210.9,
    volumeRatio: 1.44,
    signal: "Buy Watch",
    buyAbove: 214.25,
    stopLoss: 206.2,
    target1: 222.3,
    target2: 230.4,
    target3: 238.5,
    support: 210.6,
    resistance: 218.9,
    rr: 2.0,
    explanation:
      "The stock is holding above a rising 44 SMA. The candle closed green, but price still needs a clean break above short-term resistance for a stronger buy signal.",
    strategy:
      "Watch for price to cross above the buy level with volume. Avoid chasing if price opens too far above the trigger."
  },
  {
    ticker: "NVDA",
    company: "NVIDIA Corporation",
    market: "USA",
    price: 181.32,
    fundamentalScore: 96,
    technicalScore: 95,
    sma44: 179.7,
    volumeRatio: 1.73,
    signal: "Buy",
    buyAbove: 183.1,
    stopLoss: 174.8,
    target1: 191.4,
    target2: 199.7,
    target3: 208.0,
    support: 179.5,
    resistance: 186.9,
    rr: 2.2,
    explanation:
      "Strong fundamentals, rising trend, and heavy volume confirm institutional interest. The 44 SMA acted like support and price closed strong.",
    strategy:
      "Enter only after confirmation above the buy level. Use a tight position size because this stock can move fast."
  },
  {
    ticker: "SHOP.TO",
    company: "Shopify Inc.",
    market: "Canada",
    price: 151.65,
    fundamentalScore: 84,
    technicalScore: 86,
    sma44: 150.4,
    volumeRatio: 1.51,
    signal: "Buy Watch",
    buyAbove: 153.2,
    stopLoss: 146.3,
    target1: 160.1,
    target2: 167.0,
    target3: 174.2,
    support: 150.1,
    resistance: 155.8,
    rr: 2.0,
    explanation:
      "Price is pulling back into the 44 SMA while the moving average is still rising. Buyers are present, but a breakout above resistance would improve the setup.",
    strategy:
      "Wait for a close or strong intraday move above the buy level. Protect the trade below support if the setup fails."
  },
  {
    ticker: "RY.TO",
    company: "Royal Bank of Canada",
    market: "Canada",
    price: 178.2,
    fundamentalScore: 88,
    technicalScore: 82,
    sma44: 176.85,
    volumeRatio: 1.37,
    signal: "Hold",
    buyAbove: 180.0,
    stopLoss: 172.4,
    target1: 187.6,
    target2: 195.2,
    target3: 202.8,
    support: 176.4,
    resistance: 181.5,
    rr: 2.0,
    explanation:
      "The stock is in a steady uptrend and is respecting the 44 SMA. Volume is above the required level, but the move is slower and more defensive.",
    strategy:
      "Good for conservative swing traders. Wait for a stronger push above resistance before adding new money."
  },
  {
    ticker: "CNQ.TO",
    company: "Canadian Natural Resources",
    market: "Canada",
    price: 48.75,
    fundamentalScore: 81,
    technicalScore: 84,
    sma44: 48.22,
    volumeRatio: 1.41,
    signal: "Buy Watch",
    buyAbove: 49.35,
    stopLoss: 46.9,
    target1: 51.8,
    target2: 54.25,
    target3: 56.7,
    support: 48.1,
    resistance: 50.0,
    rr: 2.0,
    explanation:
      "The pullback is controlled and price is closing above the 44 SMA. Energy stocks can be sensitive to oil price movement, so confirmation matters.",
    strategy:
      "Use the buy-above level as confirmation. If oil weakens or the stock closes below the SMA, avoid the trade."
  }
];

const state = {
  marketCondition: "Neutral",
  marketFilter: "All",
  signalFilter: "All"
};

const resultsBody = document.getElementById("resultsBody");
const detailsGrid = document.getElementById("detailsGrid");
const qualifiedCount = document.getElementById("qualifiedCount");
const averageFundamental = document.getElementById("averageFundamental");
const bestSignal = document.getElementById("bestSignal");
const marketConditionPill = document.getElementById("marketConditionPill");
const marketFilter = document.getElementById("marketFilter");
const signalFilter = document.getElementById("signalFilter");

function money(value) {
  return `$${Number(value).toFixed(2)}`;
}

function getSignalClass(signal) {
  if (signal === "Buy") return "buy";
  if (signal === "Buy Watch") return "watch";
  return "hold";
}

function rankScore(stock) {
  return stock.fundamentalScore * 0.38 + stock.technicalScore * 0.42 + stock.volumeRatio * 7 + stock.rr * 4;
}

function getFilteredData() {
  return scannerData
    .filter((stock) => state.marketFilter === "All" || stock.market === state.marketFilter)
    .filter((stock) => state.signalFilter === "All" || stock.signal === state.signalFilter)
    .sort((a, b) => rankScore(b) - rankScore(a));
}

function renderDashboard(data) {
  qualifiedCount.textContent = data.length;
  averageFundamental.textContent = data.length
    ? Math.round(data.reduce((sum, stock) => sum + stock.fundamentalScore, 0) / data.length)
    : 0;
  bestSignal.textContent = data[0] ? `${data[0].ticker} ${data[0].signal}` : "-";
  marketConditionPill.textContent = `Market: ${state.marketCondition}`;
}

function renderTable(data) {
  resultsBody.innerHTML = data
    .map(
      (stock, index) => `
        <tr>
          <td>#${index + 1}</td>
          <td>
            <span class="ticker">${stock.ticker}</span>
            <span class="company">${stock.company}</span>
          </td>
          <td>${stock.market}</td>
          <td>${money(stock.price)}</td>
          <td>${stock.fundamentalScore}/100</td>
          <td>${stock.technicalScore}/100</td>
          <td>${money(stock.sma44)}</td>
          <td>${stock.volumeRatio.toFixed(2)}x</td>
          <td><span class="signal ${getSignalClass(stock.signal)}">${stock.signal}</span></td>
          <td class="levels-mini">
            Buy above: <strong>${money(stock.buyAbove)}</strong><br />
            Stop: ${money(stock.stopLoss)}<br />
            T1: ${money(stock.target1)}
          </td>
        </tr>
      `
    )
    .join("");
}

function renderDetails(data) {
  detailsGrid.innerHTML = data
    .map(
      (stock) => `
        <article class="detail-card">
          <div class="detail-top">
            <div>
              <h4>${stock.ticker} — ${stock.company}</h4>
              <p>${stock.market} • Current price ${money(stock.price)}</p>
            </div>
            <span class="signal ${getSignalClass(stock.signal)}">${stock.signal}</span>
          </div>

          <div class="level-grid">
            <div class="level-box"><span>Buy above</span><strong>${money(stock.buyAbove)}</strong></div>
            <div class="level-box"><span>Stop loss</span><strong>${money(stock.stopLoss)}</strong></div>
            <div class="level-box"><span>Risk/Reward</span><strong>1:${stock.rr.toFixed(1)}</strong></div>
            <div class="level-box"><span>Target 1</span><strong>${money(stock.target1)}</strong></div>
            <div class="level-box"><span>Target 2</span><strong>${money(stock.target2)}</strong></div>
            <div class="level-box"><span>Target 3</span><strong>${money(stock.target3)}</strong></div>
            <div class="level-box"><span>Support</span><strong>${money(stock.support)}</strong></div>
            <div class="level-box"><span>Resistance</span><strong>${money(stock.resistance)}</strong></div>
            <div class="level-box"><span>44 SMA</span><strong>${money(stock.sma44)}</strong></div>
          </div>

          <p><strong>Price action:</strong> ${stock.explanation}</p>
          <p><strong>Simple strategy:</strong> ${stock.strategy}</p>
        </article>
      `
    )
    .join("");
}

function render() {
  const data = getFilteredData();
  renderDashboard(data);
  renderTable(data);
  renderDetails(data);
}

function runScanAnimation() {
  const button = document.getElementById("runScanBtn");
  button.textContent = "Scanning...";
  button.disabled = true;

  setTimeout(() => {
    state.marketCondition = "Neutral to Bullish";
    button.textContent = "Run scanner";
    button.disabled = false;
    render();
  }, 650);
}

marketFilter.addEventListener("change", (event) => {
  state.marketFilter = event.target.value;
  render();
});

signalFilter.addEventListener("change", (event) => {
  state.signalFilter = event.target.value;
  render();
});

document.getElementById("runScanBtn").addEventListener("click", runScanAnimation);

document.getElementById("resetBtn").addEventListener("click", () => {
  state.marketFilter = "All";
  state.signalFilter = "All";
  state.marketCondition = "Neutral";
  marketFilter.value = "All";
  signalFilter.value = "All";
  render();
});

render();
