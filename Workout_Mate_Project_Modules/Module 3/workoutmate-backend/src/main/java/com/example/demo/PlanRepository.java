package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.time.LocalDate;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    // Find all plans for one user
    List<Plan> findByUserId(Long userId);

    // Optionally: For weekly/monthly views
    List<Plan> findByUserIdAndDateBetween(Long userId, LocalDate start, LocalDate end);
}
