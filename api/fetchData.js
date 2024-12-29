export default function handler(req, res) {
  try {
    // Generate a random S&P 500 price between 4000 and 5000
    const randomPrice = (Math.random() * 1000 + 4000).toFixed(2);

    // Return the randomized value
    res.status(200).json({ sp500: randomPrice });
  } catch (error) {
    console.error("Error in API function:", error);
    res.status(500).json({ error: "Failed to process the request" });
  }
}
