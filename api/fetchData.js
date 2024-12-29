export default async function handler(req, res) {
  try {
    // Fetch data for S&P 500 (^GSPC)
    const response = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/%5EGSPC");
    const data = await response.json();

    // Extract the latest price
    const sp500Price = data.chart.result[0].meta.regularMarketPrice;

    // Respond with the data
    res.status(200).json({ sp500: sp500Price });
  } catch (error) {
    console.error("Error fetching S&P 500 data:", error);
    res.status(500).json({ error: "Failed to fetch S&P 500 data" });
  }
}
