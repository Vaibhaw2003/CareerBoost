package com.careerboost.service;

import com.careerboost.dto.ResumeAnalysisResponse;
import com.careerboost.enums.Plan;
import com.careerboost.exception.UsageLimitExceededException;
import com.careerboost.model.Resume;
import com.careerboost.model.User;
import com.careerboost.repository.ResumeRepository;
import com.careerboost.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.io.RandomAccessReadBuffer;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ResumeService {

    private final OpenAIService openAIService;
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    public ResumeService(OpenAIService openAIService, ResumeRepository resumeRepository, UserRepository userRepository, ObjectMapper objectMapper) {
        this.openAIService = openAIService;
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
    }

    public ResumeAnalysisResponse analyzeResume(MultipartFile file, User user, boolean isRoast) throws IOException {
        // Enforce usage limits
        if (user.getPlan() == Plan.FREE && user.getUsageCount() >= 2) {
            throw new UsageLimitExceededException("Free plan limit reached. Please upgrade to PRO.");
        }

        // Extract text from PDF
        String text = extractTextFromPdf(file);
        
        // Prepare prompt
        String systemPrompt = isRoast ? 
            "You are an AI comedian and brutally honest recruiter. Roast the user's resume thoroughly but funny. Then provide structured feedback. Output strictly as JSON: {\"score\": int (0-100), \"strengths\": [string], \"weaknesses\": [string], \"suggestions\": [string], \"hiringProbability\": int (0-100)}" 
            : 
            "You are an expert technical recruiter and ATS system. Analyze the given resume. Provide a score, strengths, weaknesses, actionable suggestions, and a hiring probability percentage. Output strictly as JSON: {\"score\": int (0-100), \"strengths\": [string], \"weaknesses\": [string], \"suggestions\": [string], \"hiringProbability\": int (0-100)}";

        // Call OpenAI
        String jsonResponse = openAIService.callChatAPI(systemPrompt, text);

        // Strip markdown backticks if any
        if (jsonResponse.startsWith("```json")) {
            jsonResponse = jsonResponse.substring(7, jsonResponse.length() - 3).trim();
        }

        // Parse Response
        ResumeAnalysisResponse analysis = objectMapper.readValue(jsonResponse, ResumeAnalysisResponse.class);

        // Save to Database
        Resume resume = new Resume();
        resume.setUserId(user.getId());
        resume.setFileName(file.getOriginalFilename());
        resume.setAnalysis(jsonResponse);
        resume.setScore(analysis.getScore());
        resume.setRoastMode(isRoast);
        resumeRepository.save(resume);

        // Update User Usage
        user.setUsageCount(user.getUsageCount() + 1);
        user.setXpPoints(user.getXpPoints() + 50); // Gamification
        userRepository.save(user);

        return analysis;
    }

    private String extractTextFromPdf(MultipartFile file) throws IOException {
        try (PDDocument document = Loader.loadPDF(new RandomAccessReadBuffer(file.getInputStream()))) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }
}
