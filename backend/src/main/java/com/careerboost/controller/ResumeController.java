package com.careerboost.controller;

import com.careerboost.dto.ResumeAnalysisResponse;
import com.careerboost.model.Resume;
import com.careerboost.model.User;
import com.careerboost.repository.ResumeRepository;
import com.careerboost.service.ResumeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService resumeService;
    private final ResumeRepository resumeRepository;

    public ResumeController(ResumeService resumeService, ResumeRepository resumeRepository) {
        this.resumeService = resumeService;
        this.resumeRepository = resumeRepository;
    }

    @PostMapping(value = "/analyze")
    public ResponseEntity<ResumeAnalysisResponse> analyzeResume(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal User user
    ) {
        try {
            return ResponseEntity.ok(resumeService.analyzeResume(file, user, false));
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/roast")
    public ResponseEntity<ResumeAnalysisResponse> roastResume(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal User user
    ) {
        try {
            return ResponseEntity.ok(resumeService.analyzeResume(file, user, true));
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<Resume>> getHistory(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(resumeRepository.findByUserIdOrderByCreatedAtDesc(user.getId()));
    }
}
