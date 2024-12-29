export default function handler(req, res) {
  try {
    // Hardcoded S&P 500 value
    const simulatedPrice = "4532.45";

    // Return the simulated data as JSON
    res.status(200).json({ sp500: simulatedPrice });
  } catch (error) {
    console.error("Error in API function:", error);
    res.status(500).json({ error: "Failed to process the request" });
  }
}
