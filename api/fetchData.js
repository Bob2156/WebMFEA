export default async function handler(req, res) {
  try {
    // Simulate fetching S&P 500 data by generating a random value
    const simulatedPrice = (Math.random() * 1000 + 4000).toFixed(2); // Random value between 4000 and 5000

    // Respond with the simulated value
    res.status(200).json({ sp500: simulatedPrice });
  } catch (error) {
    console.error("Error in serverless function:", error);
    res.status(500).json({ error: "Failed to fetch simulated data" });
  }
}
