import React, { useEffect, useState } from "react";
import axios from "axios";

function PlanList({ userId }) {
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/plans/user/${userId}`)
      .then((res) => setPlans(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  // Mark plan as completed
  const completePlan = async (planId) => {
    await axios.put(`http://localhost:8081/api/plans/complete/${planId}`);
    // Refresh list
    axios
      .get(`http://localhost:8081/api/plans/user/${userId}`)
      .then((res) => setPlans(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h3 style={{ color: "#3a624c" }}>Your Workout Plans</h3>
      <ul>
        {plans.map((plan) => (
          <li key={plan.id} style={{ margin: "6px 0" }}>
            {plan.date}: <span style={{ fontWeight: 600 }}>{plan.workoutName}</span> {plan.completed ? "✔️" : "❌"}
            {!plan.completed && (
              <button
                style={{ marginLeft: "16px", background: "#1877d2", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "4px", cursor: "pointer" }}
                onClick={() => completePlan(plan.id)}
              >
                Mark Completed
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default PlanList;
