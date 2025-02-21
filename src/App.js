import { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState([]);

  const handleSubmit = async () => {
    try {
      const jsonInput = JSON.parse(input);
      const res = await axios.post("https://vercel.com/dakshs-projects-f5b5518a/bfhl-backend/7Qx91GrDeTpLabytm6bUCQ27iVio/api/bfhl", jsonInput);
      setResponse(res.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON or server error");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>BFHL Challenge</h1>
        <textarea
          className="input-box"
          rows="4"
          placeholder='{"data": ["A","1","B","2"]}'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
        {error && <p className="error-msg">{error}</p>}
        {response && (
          <div className="response-box">
            <label>Filter Results:</label>
            <select multiple className="dropdown" onChange={(e) => setFilter([...e.target.selectedOptions].map(o => o.value))}>
              <option value="numbers">Numbers</option>
              <option value="alphabets">Alphabets</option>
              <option value="highest_alphabet">Highest Alphabet</option>
            </select>
            <pre className="response-data">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
