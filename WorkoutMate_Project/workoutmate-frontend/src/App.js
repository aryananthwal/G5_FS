import React, { useState } from "react";
import PlanList from "./components/PlanList";
import AddPlanForm from "./components/AddPlanForm";
import CalendarView from "./components/CalendarView";
import Dashboard from "./components/Dashboard";

function App() {
  const [refresh, setRefresh] = useState(false);
  const handlePlanAdded = () => setRefresh(!refresh);

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#f6f6f6', minHeight: '100vh', padding: '0 0 30px 0' }}>
      <div style={{ textAlign: 'center', background: '#fff', padding: '24px 0 10px 0', boxShadow: '0 2px 6px #eee', marginBottom: '32px' }}>
        <h1 style={{ color: '#1877d2', marginBottom: '12px' }}>WorkoutMate 🏋️‍♂️</h1>
        <p style={{ maxWidth: '580px', margin: '0 auto', color: '#555' }}>
          Your all-in-one fitness planner: schedule workouts, track progress, visualize your fitness journey, and stay motivated with personal stats!
        </p>
      </div>
      <div style={{ maxWidth: "900px", margin: "0 auto", background: "#fff", padding: "14px 16px 40px 16px", borderRadius: "8px", boxShadow: "0 2px 12px #eee" }}>
        <Dashboard userId={1} key={refresh}/>
        <hr style={{ margin: "32px 0" }}/> 
        <AddPlanForm userId={1} onPlanAdded={handlePlanAdded}/>
        <PlanList userId={1} key={refresh}/>
        <hr style={{ margin: "32px 0" }}/>
        <CalendarView userId={1} key={refresh}/>
      </div>
    </div>
  );
}

export default App;
