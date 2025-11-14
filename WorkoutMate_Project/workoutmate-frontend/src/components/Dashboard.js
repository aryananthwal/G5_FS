import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Dashboard({ userId }) {
  const [plans, setPlans] = useState([]);
  const [completionRate, setCompletionRate] = useState(0);
  const [weekData, setWeekData] = useState({ completed: 0, scheduled: 0 });
  const [currentStreak, setCurrentStreak] = useState(0);
  const [mostActiveDay, setMostActiveDay] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:8081/api/plans/user/${userId}`)
      .then(res => {
        setPlans(res.data);
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const monthPlans = res.data.filter(plan => {
          const planDate = new Date(plan.date);
          return planDate.getMonth() === currentMonth && planDate.getFullYear() === currentYear;
        });
        const completed = monthPlans.filter(p => p.completed).length;
        setCompletionRate(
          monthPlans.length > 0 ? Math.round((completed / monthPlans.length) * 100) : 0
        );
        // WEEKLY
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        const endOfWeek = new Date(now);
        endOfWeek.setDate(now.getDate() + (6 - now.getDay()));
        const weekPlans = res.data.filter(plan => {
          const planDate = new Date(plan.date);
          return planDate >= startOfWeek && planDate <= endOfWeek;
        });
        const weekCompleted = weekPlans.filter(p => p.completed).length;
        setWeekData({ completed: weekCompleted, scheduled: weekPlans.length - weekCompleted });
        // STREAK
        const todayDate = new Date();
        let streak = 0;
        for (let i = 0; i < 30; i++) {
          const dateString = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - i).toLocaleDateString('en-CA');
          const hasCompleted = res.data.some(plan => plan.date === dateString && plan.completed);
          if (hasCompleted) {
            streak++;
          } else if (i === 0) {
            continue;
          } else {
            break;
          }
        }
        setCurrentStreak(streak);
        // MOST ACTIVE DAY
        const dayMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const completedPlans = res.data.filter(p => p.completed);
        const counts = Array(7).fill(0);
        completedPlans.forEach(plan => {
          const planDate = new Date(plan.date);
          const dow = planDate.getDay();
          counts[dow]++;
        });
        let max = 0;
        let maxIndex = 0;
        counts.forEach((cnt, idx) => {
          if (cnt > max) {
            max = cnt;
            maxIndex = idx;
          }
        });
        setMostActiveDay(max > 0 ? dayMap[maxIndex] : "None yet");
      })
      .catch(err => console.error(err));
  }, [userId]);
  // MONTHLY FOR CHART
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const monthPlans = plans.filter(plan => {
    const planDate = new Date(plan.date);
    return planDate.getMonth() === currentMonth && planDate.getFullYear() === currentYear;
  });
  const completedCount = monthPlans.filter(p => p.completed).length;
  const scheduledCount = monthPlans.length - completedCount;
  const data = [
    {
      name: "This Month",
      Completed: completedCount,
      Scheduled: scheduledCount
    }
  ];

  return (
    <div style={{ marginBottom: "16px" }}>
      <h2 style={{ color: "#244a63" }}>Progress Dashboard</h2>
      <p>Workouts completed this month: <b>{completionRate}%</b></p>
      <ResponsiveContainer width="100%" height={230}>
        <BarChart data={data} margin={{ top: 18, right: 16, left: 8, bottom: 12 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Completed" fill="#82ca9d" />
          <Bar dataKey="Scheduled" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <p>Total workouts scheduled this month: {monthPlans.length}</p>
      <hr/>
      <h3 style={{ color: "#24558a" }}>This Week's Workouts</h3>
      <p>Completed: {weekData.completed}</p>
      <p>Scheduled/Remaining: {weekData.scheduled}</p>
      <p>Total planned workouts this week: {weekData.completed + weekData.scheduled}</p>
      <hr/>
      <h3 style={{ color: "#409055" }}>Current Workout Streak</h3>
      <p>You have completed at least one workout for <b>{currentStreak}</b> consecutive day(s)!</p>
      <hr/>
      <h3 style={{ color: "#db7442" }}>Most Active Day</h3>
      <p>Your most consistent workout day is: <b>{mostActiveDay}</b></p>
    </div>
  );
}

export default Dashboard;
