import { useState } from "react";
import BloodPressureForm from "./BloodPressureForm";
import BloodSugarForm from "./BloodSugarForm";

function Vitals() {
  const [selectedVital, setSelectedVital] = useState("");

  return (
    <div className="vitals-page">
      <h1>Vitals</h1>
      <p className="vital-subtext">
        Step 1: Choose what you want to record
      </p>

     <div className="vital-selector">
  <label
    className={`vital-option ${
      selectedVital === "bloodPressure" ? "active" : ""
    }`}
  >
    <input
      type="radio"
      name="vital"
      value="bloodPressure"
      checked={selectedVital === "bloodPressure"}
      onChange={(e) => setSelectedVital(e.target.value)}
    />
    <div className="vital-option-content">
      <span className="vital-icon">🫀</span>
      <div className="vitalsmalltext">
        <h3>Blood Pressure</h3>
        <p>Record systolic and diastolic readings</p>
      </div>
    </div>
  </label>

  <label
    className={`vital-option ${
      selectedVital === "bloodSugar" ? "active" : ""
    }`}
  >
    <input
      type="radio"
      name="vital"
      value="bloodSugar"
      checked={selectedVital === "bloodSugar"}
      onChange={(e) => setSelectedVital(e.target.value)}
    />
    <div className="vital-option-content">
      <span className="vital-icon">🩸</span>
      <div className="vital-text">
        <h3>Blood Sugar</h3>
        <p>Record glucose level (mg/dL)</p>
      </div>
    </div>
  </label>
</div>


      {selectedVital && (
        <p className="vital-subtext" style={{ marginTop: "2rem" }}>
          Step 2: Enter your readings
        </p>
      )}

      {selectedVital === "bloodPressure" && <BloodPressureForm />}
      {selectedVital === "bloodSugar" && <BloodSugarForm />}
    </div>
  );
}

export default Vitals;
