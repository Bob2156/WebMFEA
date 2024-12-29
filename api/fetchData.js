export default async function handler(req, res) {
  try {
    // Fetch data for S&P 500 from Yahoo Finance
    const response = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/%5EGSPC");
    const data = await response.json();

    // Extract the current price
    const sp500Price = data.chart.result[0].meta.regularMarketPrice;

    // Return the actual S&P 500 value
    res.status(200).json({ sp500: sp500Price });
  } catch (error) {
    console.error("Error fetching actual data:", error);
    res.status(500).json({ error: "Failed to fetch S&P 500 data" });
  }
}
