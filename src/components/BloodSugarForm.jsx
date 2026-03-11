import { useState, useEffect } from "react";
import BloodSugarChart from "./BloodSugarChart";

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

function BloodSugarForm() {
  const [sugarLevel, setSugarLevel] = useState("");
  const [error, setError] = useState("");
  const [savedReadings, setSavedReadings] = useState([]);

  // 🔥 Real-time Fetch
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "bloodSugar"),
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

  // 🔍 Validation
  const validateSugar = (value) => {
    if (!value) return "Sugar level is required.";
    if (value < 40 || value > 500)
      return "Sugar value seems incorrect.";
    return "";
  };

  const handleChange = (value) => {
    setError(validateSugar(value));
    setSugarLevel(value);
  };

  // ✅ Save (Now Supports Enter Key)
  const handleSave = async (e) => {
    e.preventDefault(); // prevent page reload

    const user = auth.currentUser;
    if (!user) return;

    if (error || !sugarLevel) return;

    try {
      await addDoc(
        collection(db, "users", user.uid, "bloodSugar"),
        {
          sugarLevel: Number(sugarLevel),
          timestamp: new Date(),
        }
      );

      setSugarLevel("");
    } catch (error) {
      console.error("Error saving sugar:", error);
    }
  };

  // 🗑 Clear History with Confirmation
  const handleClearHistory = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const confirmClear = window.confirm(
      "⚠️ This will permanently delete all saved readings. Continue?"
    );

    if (!confirmClear) return;

    try {
      const snapshot = await getDocs(
        collection(db, "users", user.uid, "bloodSugar")
      );

      const deletePromises = snapshot.docs.map((document) =>
        deleteDoc(doc(db, "users", user.uid, "bloodSugar", document.id))
      );

      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error clearing history:", error);
    }
  };

  return (
    <div className="vital-card">
      <h2>Blood Sugar</h2>
      <p className="vital-subtext">
        Enter glucose level (mg/dL)
      </p>

      {/* 🔥 FORM WRAPPER */}
      <form onSubmit={handleSave}>
        <div className="sugar-field">
          <label>Sugar Level (mg/dL)</label>
          <input
            type="number"
            placeholder="e.g. 110"
            value={sugarLevel}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        {!error && sugarLevel && (
          <p className="bp-preview">
            Current Reading: <strong>{sugarLevel} mg/dL</strong>
          </p>
        )}

        <button
          type="submit"
          className="save-btn"
          disabled={!!error || !sugarLevel}
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
                <strong>{reading.sugarLevel} mg/dL</strong>
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

      {/* 📊 Chart */}
      {savedReadings.length > 1 && (
        <BloodSugarChart data={savedReadings} />
      )}

      {/* 🗑 Clear Button */}
      {savedReadings.length > 0 && (
        <button className="clear-btn" onClick={handleClearHistory}>
          Clear History
        </button>
      )}
    </div>
  );
}

export default BloodSugarForm;