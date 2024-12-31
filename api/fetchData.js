// api/fetchData.js

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { ticker, range } = req.query;

  if (!ticker) {
    res.status(400).json({ error: "Ticker symbol is required." });
    return;
  }

  // Define valid ranges and corresponding intervals
  const rangeOptions = {
    '1d': { range: '1d', interval: '1m' },
    '1mo': { range: '1mo', interval: '5m' },
    '1y': { range: '1y', interval: '1d' },
    '3y': { range: '3y', interval: '1wk' },
    '10y': { range: '10y', interval: '1mo' },
  };

  // Set default range if not provided or invalid
  const selectedRange = rangeOptions[range] ? range : '1d';
  const { range: yahooRange, interval } = rangeOptions[selectedRange];

  try {
    // Fetch the financial data for the specified ticker and range
    const tickerResponse = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=${interval}&range=${yahooRange}`);

    if (!tickerResponse.ok) {
      throw new Error("Failed to fetch data from Yahoo Finance.");
    }

    const tickerData = await tickerResponse.json();

    // Check if the response contains valid data
    if (
      !tickerData.chart.result ||
      tickerData.chart.result.length === 0 ||
      !tickerData.chart.result[0].meta.regularMarketPrice
    ) {
      throw new Error("Invalid ticker symbol or data unavailable.");
    }

    // Extract current price
    const currentPrice = tickerData.chart.result[0].meta.regularMarketPrice.toFixed(2);

    // Extract historical prices and timestamps
    const timestamps = tickerData.chart.result[0].timestamp;
    const adjClose = tickerData.chart.result[0].indicators.adjclose[0].adjclose;

    // Handle missing data
    if (!timestamps || !adjClose || timestamps.length !== adjClose.length) {
      throw new Error("Incomplete historical data.");
    }

    // Prepare historical data for Chart.js
    const historicalData = timestamps.map((timestamp, index) => ({
      date: new Date(timestamp * 1000).toLocaleDateString(),
      price: adjClose[index],
    }));

    // Return the current price and historical data
    res.status(200).json({
      ticker: ticker.toUpperCase(),
      currentPrice: `$${currentPrice}`,
      historicalData: historicalData,
      selectedRange: selectedRange,
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: error.message || "Failed to fetch financial data." });
  }
}
