import React, { useState } from "react";
import axios from "axios";

function AddPlanForm({ userId, onPlanAdded }) {
  const [date, setDate] = useState("");
  const [workoutName, setWorkoutName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8081/api/plans/schedule", {
      date,
      workoutName,
      user: { id: userId }
    });
    setDate("");
    setWorkoutName("");
    if (onPlanAdded) onPlanAdded();
  };
  return (
    <form onSubmit={handleSubmit} style={{ margin: "30px 0" }}>
      <h3 style={{ color: "#6b4488" }}>Add New Workout Plan</h3>
      <div style={{ marginBottom: "10px" }}>
        <label>Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{ margin: "0 16px 0 4px", padding: "3px 14px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Workout Name: </label>
        <input
          type="text"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          required
          style={{ margin: "0 16px 0 4px", padding: "3px 14px" }}
        />
      </div>
      <button type="submit" style={{ background: "#409055", color: "#fff", border: "none", borderRadius: "4px", padding: "7px 22px", cursor: "pointer" }}>
        Add Plan
      </button>
    </form>
  );
}
export default AddPlanForm;
