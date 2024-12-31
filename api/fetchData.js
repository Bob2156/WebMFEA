// api/fetchData.js

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { ticker } = req.query;

  if (!ticker) {
    res.status(400).json({ error: "Ticker symbol is required." });
    return;
  }

  try {
    // Fetch the financial data for the specified ticker
    const tickerResponse = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=1d`);
    
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

    // Return the current price
    res.status(200).json({
      ticker: ticker.toUpperCase(),
      currentPrice: `$${currentPrice}`,
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: error.message || "Failed to fetch financial data." });
  }
}

