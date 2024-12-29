export default async function handler(req, res) {
  try {
    // Fetch data for S&P 500 (^GSPC) and 3-Month Treasury Rate (^IRX) concurrently
    const [sp500Response, treasuryResponse] = await Promise.all([
      fetch("https://query1.finance.yahoo.com/v8/finance/chart/%5EGSPC"),
      fetch("https://query1.finance.yahoo.com/v8/finance/chart/%5EIRX"),
    ]);

    const sp500Data = await sp500Response.json();
    const treasuryData = await treasuryResponse.json();

    // Extract the current prices
    const sp500Price = sp500Data.chart.result[0].meta.regularMarketPrice;
    const treasuryRate = treasuryData.chart.result[0].meta.regularMarketPrice;

    // Return both values as JSON
    res.status(200).json({
      sp500: sp500Price,
      treasuryRate: treasuryRate,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch financial data" });
  }
}
