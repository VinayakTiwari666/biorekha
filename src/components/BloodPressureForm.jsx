import { useState, useEffect } from "react";
import BloodPressureChart from "./BloodPressureChart";


function BloodPressureForm() {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [error, setError] = useState("");
  const [savedReadings, setSavedReadings] = useState([]);
  const handleClearHistory = () => {
  localStorage.removeItem("bloodPressureData");
  setSavedReadings([]);
};


  useEffect(() => {
    const storedData =
      JSON.parse(localStorage.getItem("bloodPressureData")) || [];
    setSavedReadings(storedData);
  }, []);

  const validateBP = (sys, dia) => {
    if (!sys || !dia) return "Both values are required.";
    if (sys < 50 || sys > 250) return "Systolic value seems incorrect.";
    if (dia < 30 || dia > 150) return "Diastolic value seems incorrect.";
    return "";
  };

  const handleChange = (type, value) => {
    const newSys = type === "sys" ? value : systolic;
    const newDia = type === "dia" ? value : diastolic;

    setError(validateBP(newSys, newDia));

    if (type === "sys") setSystolic(value);
    if (type === "dia") setDiastolic(value);
  };

  const handleSave = () => {
    const newEntry = {
      systolic: Number(systolic),
      diastolic: Number(diastolic),
      timestamp: new Date().toISOString(),
    };

    const updatedData = [...savedReadings, newEntry];

    localStorage.setItem(
      "bloodPressureData",
      JSON.stringify(updatedData)
    );

    setSavedReadings(updatedData);

    // Reset inputs
    setSystolic("");
    setDiastolic("");
  };

  return (
    <div className="vital-card">
      <h2>Blood Pressure</h2>
      <p className="vital-subtext">
        Enter systolic and diastolic pressure
      </p>

      <div className="bp-inputs">
        <div className="bp-field">
          <label>Systolic (mmHg)</label>
          <input
            type="number"
            placeholder="e.g. 120"
            value={systolic}
            onChange={(e) => handleChange("sys", e.target.value)}
          />
        </div>

        <div className="bp-field">
          <label>Diastolic (mmHg)</label>
          <input
            type="number"
            placeholder="e.g. 80"
            value={diastolic}
            onChange={(e) => handleChange("dia", e.target.value)}
          />
        </div>
      </div>

      {error && <p className="error-text">{error}</p>}

      {!error && systolic && diastolic && (
        <p className="bp-preview">
          Current Reading: <strong>{systolic}/{diastolic} mmHg</strong>
        </p>
      )}

      <button
        className="save-btn"
        disabled={!!error || !systolic || !diastolic}
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
                  <strong>
                    {reading.systolic}/{reading.diastolic} mmHg
                  </strong>
                  <span>
                    {new Date(reading.timestamp).toLocaleString()}
                  </span>
                </li>
              ))}
          </ul>
        </div>
        
      )}
      {savedReadings.length > 1 && (
  <BloodPressureChart data={savedReadings} />
)}
<button className="clear-btn" onClick={handleClearHistory}>
  Clear History
</button>


    </div>
  );
}

export default BloodPressureForm;

