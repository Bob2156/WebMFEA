// /api/fetchData.js
export default async function handler(req, res) {
  try {
    // Fetch data for S&P 500 (^GSPC), Treasury Bill (^IRX), and Total World Stock (^VT)
    const sp500Response = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/%5EGSPC");
    const treasuryResponse = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/%5EIRX");
    const worldStockResponse = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/VT");

    const sp500Data = await sp500Response.json();
    const treasuryData = await treasuryResponse.json();
    const worldStockData = await worldStockResponse.json();

    // Extract the latest market prices
    const sp500Price = sp500Data.chart.result[0].meta.regularMarketPrice;
    const treasuryRate = treasuryData.chart.result[0].meta.regularMarketPrice;
    const worldStockPrice = worldStockData.chart.result[0].meta.regularMarketPrice;

    // Return the data as JSON
    res.status(200).json({
      sp500: sp500Price,
      treasuryBillRate: treasuryRate,
      totalWorldStock: worldStockPrice,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch financial data" });
  }
}
