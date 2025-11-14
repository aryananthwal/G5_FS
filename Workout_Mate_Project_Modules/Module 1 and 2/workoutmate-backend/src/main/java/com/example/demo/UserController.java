package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    // Registration endpoint
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "Error: Email already registered!";
        }
        userRepository.save(user);
        return "User registered successfully!";
    }

    
    @PostMapping("/login")
    public String loginUser(@RequestBody User user) {
        User foundUser = userRepository.findByEmail(user.getEmail());
        if (foundUser == null) {
            return "Error: User not found!";
        }
        if (!foundUser.getPassword().equals(user.getPassword())) {
            return "Error: Incorrect password!";
        }
        return "Login successful!";
    }
    
    @PostMapping("/plan")
    public String generatePlan(@RequestBody User user) {
        String goal = user.getFitnessGoal();
        String plan;

        switch (goal.toLowerCase()) {
            case "weight loss":
                plan = "Workout Plan for Weight Loss: 5 days/week cardio, 3 days/week strength training, balanced diet.";
                break;
            case "muscle gain":
                plan = "Workout Plan for Muscle Gain: 4 days/week weight training, 2 days/week cardio, high-protein diet.";
                break;
            case "stay fit":
                plan = "Workout Plan to Stay Fit: 3 days/week mixed workouts, healthy eating, regular activity.";
                break;
            default:
                plan = "Workout Plan: Personalized plan will be discussed with your trainer.";
                break;
        }

        return plan;
    }



}
