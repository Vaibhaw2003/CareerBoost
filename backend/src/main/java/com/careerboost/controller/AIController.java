package com.careerboost.controller;

import com.careerboost.dto.InterviewRequest;
import com.careerboost.dto.RoadmapRequest;
import com.careerboost.model.User;
import com.careerboost.service.AIFeatureService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIFeatureService aiFeatureService;

    public AIController(AIFeatureService aiFeatureService) {
        this.aiFeatureService = aiFeatureService;
    }

    @PostMapping(value = "/interview", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> generateInterview(@RequestBody InterviewRequest request, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(aiFeatureService.generateInterviewQuestions(request, user));
    }

    @PostMapping(value = "/roadmap", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> generateRoadmap(@RequestBody RoadmapRequest request, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(aiFeatureService.generateRoadmap(request, user));
    }

    @PostMapping(value = "/projects", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> generateProjects(@RequestBody Map<String, String> request, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(aiFeatureService.generateProjectIdeas(request.get("techStack"), request.get("level"), user));
    }

    @PostMapping(value = "/branding", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> generateBranding(@RequestBody Map<String, String> request, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(aiFeatureService.generateBranding(request.get("type"), request.get("userDetails"), user));
    }
}
