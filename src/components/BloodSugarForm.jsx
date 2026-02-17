import { useState, useEffect } from "react";
import BloodSugarChart from "./BloodSugarChart";


function BloodSugarForm() {
  const [bloodSugar, setBloodSugar] = useState("");
  const [error, setError] = useState("");
  const [savedReadings, setSavedReadings] = useState([]);
  const handleClearHistory = () => {
  localStorage.removeItem("bloodSugarData");
  setSavedReadings([]);
};


  useEffect(() => {
    const storedData =
      JSON.parse(localStorage.getItem("bloodSugarData")) || [];
    setSavedReadings(storedData);
  }, []);

  const validateSugar = (value) => {
    if (!value) return "Blood sugar value is required.";
    if (value < 40 || value > 500)
      return "Blood sugar value seems incorrect.";
    return "";
  };

  const handleChange = (value) => {
    setBloodSugar(value);
    setError(validateSugar(value));
  };

  const handleSave = () => {
    const newEntry = {
      value: Number(bloodSugar),
      timestamp: new Date().toISOString(),
    };

    const updatedData = [...savedReadings, newEntry];

    localStorage.setItem(
      "bloodSugarData",
      JSON.stringify(updatedData)
    );

    setSavedReadings(updatedData);
    setBloodSugar("");
  };

  return (
    <div className="vital-card">
      <h2>Blood Sugar</h2>
      <p className="vital-subtext">
        Enter your blood glucose level
      </p>

      <div className="sugar-field">
        <label>Blood Sugar (mg/dL)</label>
        <input
          type="number"
          placeholder="e.g. 110"
          value={bloodSugar}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>

      {error && <p className="error-text">{error}</p>}

      {!error && bloodSugar && (
        <p className="sugar-preview">
          Current Reading: <strong>{bloodSugar} mg/dL</strong>
        </p>
      )}

      <button
        className="save-btn"
        disabled={!!error || !bloodSugar}
        onClick={handleSave}
      >
        Save Reading
      </button>

      {/* ===== SAVED READINGS ===== */}

      {savedReadings.length > 0 && (
        <div className="history-section">
          <h3>Saved Readings</h3>

          <ul className="history-list">
            {savedReadings
              .slice()
              .reverse()
              .map((reading, index) => (
                <li key={index}>
                  <strong>{reading.value} mg/dL</strong>
                  <span>
                    {new Date(reading.timestamp).toLocaleString()}
                  </span>
                </li>
              ))}
          </ul>
          {savedReadings.length > 1 && (
  <BloodSugarChart data={savedReadings} />
  
  
)}
{savedReadings.length > 0 && (
  <>
    <div className="history-section">
      <h3>Saved Readings</h3>

      <ul className="history-list">
        {savedReadings
          .slice()
          .reverse()
          .map((reading, index) => (
            <li key={index}>
              <strong>{reading.value} mg/dL</strong>
              <span>
                {new Date(reading.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
      </ul>
    </div>

    <button className="clear-btn" onClick={handleClearHistory}>
      Clear History
    </button>
  </>
)}


        </div>
        
      )}
    </div>
  );
}

export default BloodSugarForm;
