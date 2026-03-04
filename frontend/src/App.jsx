import { useState } from "react";

export default function App() {
  const [numPlayers, setNumPlayers] = useState(2);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");
  const [results, setResults] = useState(null);

  const initializePlayers = () => {
    const newPlayers = [];
    for (let i = 1; i <= numPlayers; i++) {
      newPlayers.push({
        name: `Player ${i}`,
        assetA: 0,
        assetB: 0,
      });
    }
    setPlayers(newPlayers);
    setResults(null);
    setError("");
  };

  const updateInvestment = (index, field, value) => {
    const updated = [...players];
    updated[index][field] = parseInt(value) || 0;
    setPlayers(updated);
  };

  const validateInputs = () => {
    for (let p of players) {
      if (p.assetA < 0 || p.assetB < 0) {
        return "Investments cannot be negative.";
      }
      if (p.assetA + p.assetB !== 100) {
        return `${p.name} must allocate exactly $100.`;
      }
    }
    return "";
  };

  const calculateResults = async () => {
    setError("");
    setResults(null);
  
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/calculate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ players }),
      });
  
      const data = await response.json();
  
      if (data.error) {
        setError(data.error);
        return;
      }
      
      setResults(data);
    } catch (err) {
      setError("Unable to connect to server.");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Investment Decision Game</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>Number of Players (2–4): </label>
        <input
          type="number"
          min="2"
          max="4"
          value={numPlayers}
          onChange={(e) => setNumPlayers(parseInt(e.target.value))}
        />
        <button onClick={initializePlayers} style={{ marginLeft: "10px" }}>
          Start Game
        </button>
      </div>

      {players.map((player, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <h3>{player.name}</h3>

          <label>Asset A: </label>
          <input
            type="number"
            value={player.assetA}
            onChange={(e) =>
              updateInvestment(index, "assetA", e.target.value)
            }
          />

          <label style={{ marginLeft: "15px" }}>Asset B: </label>
          <input
            type="number"
            value={player.assetB}
            onChange={(e) =>
              updateInvestment(index, "assetB", e.target.value)
            }
          />

          <div style={{ marginTop: "5px", fontSize: "14px" }}>
            Total: ${player.assetA + player.assetB}
          </div>
        </div>
      ))}

      {players.length > 0 && (
        <button onClick={calculateResults}>
          Calculate Results
        </button>
      )}

      {error && (
        <div style={{ color: "red", marginTop: "15px" }}>
          {error}
        </div>
      )}

      {results && (
        <div style={{ marginTop: "30px" }}>
          <h2>Results Summary</h2>
          <p>Total Asset B Pool: ${results.totalB}</p>
          <p>Pool after 50% Increase: ${results.increasedPool}</p>
          <p>Each Player Receives from Asset B: ${results.sharePerPlayer}</p>

          <h3>Final Payouts</h3>
          <ul>
            {results.finalResults.map((r, index) => (
              <li key={index}>
                {r.name}: ${r.final}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}