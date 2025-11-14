import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import axios from "axios";

function CalendarView({ userId }) {
  const [plans, setPlans] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:8081/api/plans/user/${userId}`)
      .then(res => setPlans(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const match = plans.find(plan => plan.date === date.toLocaleDateString('en-CA'));
      if (match) {
        return match.completed ? (
          <span style={{ color: 'green' }}>✔️</span>
        ) : (
          <span style={{ color: 'red' }}>⚡</span>
        );
      }
    }
    return null;
  };
  const selectedPlans = selectedDate
    ? plans.filter(plan => plan.date === selectedDate.toLocaleDateString('en-CA'))
    : [];
  return (
    <div>
      <h3 style={{ color: "#2b557f" }}>Your Workout Calendar</h3>
      <Calendar
        onChange={setSelectedDate}
        tileContent={tileContent}
      />
      {selectedPlans.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Workouts for {selectedDate.toLocaleDateString('en-CA')}:</h4>
          <ul>
            {selectedPlans.map(plan => (
              <li key={plan.id}>{plan.workoutName} {plan.completed ? "✔️" : "❌"}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default CalendarView;
