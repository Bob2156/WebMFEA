// /pages/index.js
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/fetchData");
      const result = await response.json();

      if (response.ok) {
        setData(result);
      } else {
        setError(result.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", margin: "2rem" }}>
      <h1>Market Data Dashboard</h1>
      <p>Click the button below to fetch the latest market data.</p>
      <button
        onClick={fetchData}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          border: "none",
          borderRadius: "5px",
          backgroundColor: "#0070f3",
          color: "#fff",
        }}
      >
        Fetch Market Data
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Market Data:</h2>
          <p><strong>S&P 500:</strong> ${data.sp500}</p>
          <p><strong>3-Month Treasury Bill Rate:</strong> {data.treasuryBillRate}%</p>
          <p><strong>Total World Stock Index:</strong> ${data.totalWorldStock}</p>
        </div>
      )}
    </div>
  );
}
