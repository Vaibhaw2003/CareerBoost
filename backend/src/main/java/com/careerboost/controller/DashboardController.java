package com.careerboost.controller;

import com.careerboost.dto.DashboardResponse;
import com.careerboost.model.User;
import com.careerboost.repository.ResumeRepository;
import com.careerboost.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;

    public DashboardController(UserRepository userRepository, ResumeRepository resumeRepository) {
        this.userRepository = userRepository;
        this.resumeRepository = resumeRepository;
    }

    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboardStats(@AuthenticationPrincipal User user) {
        DashboardResponse response = new DashboardResponse();
        response.setXpPoints(user.getXpPoints());
        response.setLevel(user.getLevel());
        response.setUsageCount(user.getUsageCount());
        response.setPlan(user.getPlan().name());
        
        int resumeCount = resumeRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).size();
        response.setResumeAnalysesCount(resumeCount);
        
        return ResponseEntity.ok(response);
    }
}
