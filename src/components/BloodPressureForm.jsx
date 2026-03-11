import { useState, useEffect } from "react";
import BloodPressureChart from "./BloodPressureChart";

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../firebase";

function BloodPressureForm() {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [error, setError] = useState("");
  const [savedReadings, setSavedReadings] = useState([]);

  // 🔥 Real-time Fetch
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "bloodPressure"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const readings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSavedReadings(readings);
    });

    return () => unsubscribe();
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

  // ✅ Save (Now Supports Enter Key)
  const handleSave = async (e) => {
    e.preventDefault(); // prevent page reload

    const user = auth.currentUser;
    if (!user) return;

    if (error || !systolic || !diastolic) return;

    try {
      await addDoc(
        collection(db, "users", user.uid, "bloodPressure"),
        {
          systolic: Number(systolic),
          diastolic: Number(diastolic),
          timestamp: new Date(),
        }
      );

      setSystolic("");
      setDiastolic("");
    } catch (error) {
      console.error("Error saving BP:", error);
    }
  };

  // 🗑 Clear History with Confirmation
  const handleClearHistory = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const confirmClear = window.confirm(
      "⚠️ This will permanently delete all blood pressure records. Continue?"
    );

    if (!confirmClear) return;

    try {
      const snapshot = await getDocs(
        collection(db, "users", user.uid, "bloodPressure")
      );

      const deletePromises = snapshot.docs.map((document) =>
        deleteDoc(doc(db, "users", user.uid, "bloodPressure", document.id))
      );

      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error clearing history:", error);
    }
  };

  return (
    <div className="vital-card">
      <h2>Blood Pressure</h2>
      <p className="vital-subtext">
        Enter systolic and diastolic pressure
      </p>

      {/* 🔥 FORM WRAPPER */}
      <form onSubmit={handleSave}>
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
          type="submit"
          className="save-btn"
          disabled={!!error || !systolic || !diastolic}
        >
          Save Reading
        </button>
      </form>

      {/* ===== SAVED READINGS ===== */}
      {savedReadings.length > 0 && (
        <div className="history-section">
          <h3>Saved Readings</h3>

          <ul className="history-list">
            {savedReadings.map((reading) => (
              <li key={reading.id}>
                <strong>
                  {reading.systolic}/{reading.diastolic} mmHg
                </strong>
                <span>
                  {new Date(
                    reading.timestamp?.toDate?.() || reading.timestamp
                  ).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {savedReadings.length > 1 && (
        <BloodPressureChart data={savedReadings} />
      )}

      {savedReadings.length > 0 && (
        <button className="clear-btn" onClick={handleClearHistory}>
          Clear History
        </button>
      )}
    </div>
  );
}
export default BloodPressureForm;

