package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
public class PlanController {

    @Autowired
    private PlanRepository planRepository;

    // 1. Schedule a workout for a specific day
    @PostMapping("/schedule")
    public Plan scheduleWorkout(@RequestBody Plan plan) {
        plan.setCompleted(false); // New workouts are not completed
        return planRepository.save(plan);
    }

    // 2. Mark a scheduled workout as completed
    @PutMapping("/complete/{planId}")
    public Plan completeWorkout(@PathVariable Long planId) {
        Plan plan = planRepository.findById(planId).orElseThrow();
        plan.setCompleted(true);
        return planRepository.save(plan);
    }

    // 3. Get all scheduled workouts for a user (for calendar display)
    @GetMapping("/user/{userId}")
    public List<Plan> getPlansForUser(@PathVariable Long userId) {
        return planRepository.findByUserId(userId);
    }
}
