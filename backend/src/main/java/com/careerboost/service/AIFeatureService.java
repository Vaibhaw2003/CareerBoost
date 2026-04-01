package com.careerboost.service;

import com.careerboost.dto.InterviewRequest;
import com.careerboost.dto.RoadmapRequest;
import com.careerboost.model.User;
import com.careerboost.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AIFeatureService {

    private final OpenAIService openAIService;
    private final UserRepository userRepository;

    public AIFeatureService(OpenAIService openAIService, UserRepository userRepository) {
        this.openAIService = openAIService;
        this.userRepository = userRepository;
    }

    public String generateInterviewQuestions(InterviewRequest request, User user) {
        String systemPrompt = "You are an expert technical interviewer. Create 5 interview questions for a " + request.getRole() + " role with difficulty " + request.getDifficulty() + ". Provide sample excellent answers for each. Output strict JSON format: [{\"question\": \"...\", \"answer\": \"...\"}]";
        String response = openAIService.callChatAPI(systemPrompt, "Generate interview prep questions.");

        awardXp(user, 30);
        return cleanJsonResponse(response);
    }

    public String generateRoadmap(RoadmapRequest request, User user) {
        String systemPrompt = "You are a senior career coach. Create a step-by-step career roadmap to achieve the goal: '" + request.getGoal() + "' within timeframe: '" + request.getTimeframe() + "'. Break it down into weekly milestones. Output strict JSON format: {\"title\": \"...\", \"weeks\": [{\"week\": 1, \"focus\": \"...\", \"tasks\": [\"...\"]}]}";
        String response = openAIService.callChatAPI(systemPrompt, "Generate complete roadmap.");

        awardXp(user, 40);
        return cleanJsonResponse(response);
    }

    public String generateProjectIdeas(String techStack, String level, User user) {
        String systemPrompt = "You are a Senior Tech Lead. Generate 3 portfolio project ideas suitable for " + level + " level using " + techStack + ". Output strict JSON format: [{\"title\": \"...\", \"description\": \"...\", \"features\": [\"...\"], \"resumePoints\": [\"...\"]}]";
        String response = openAIService.callChatAPI(systemPrompt, "Give me project ideas.");

        awardXp(user, 20);
        return cleanJsonResponse(response);
    }

    public String generateBranding(String type, String userDetails, User user) {
        String systemPrompt = "You are a world-class personal branding expert. The user wants a " + type + " (e.g., LinkedIn Post, Portfolio Bio, or Resume Summary). Use their details: " + userDetails + ". Format beautifully with markdown. Output strict JSON: {\"content\": \"...\"}";
        String response = openAIService.callChatAPI(systemPrompt, "Generate my branding content.");

        awardXp(user, 15);
        return cleanJsonResponse(response);
    }

    private String cleanJsonResponse(String json) {
        if (json.startsWith("```json")) {
            return json.substring(7, json.length() - 3).trim();
        } else if (json.startsWith("```")) {
            return json.substring(3, json.length() - 3).trim();
        }
        return json;
    }

    private void awardXp(User user, int xp) {
        user.setXpPoints(user.getXpPoints() + xp);
        // Level up logic
        int currentXp = user.getXpPoints();
        if (currentXp > 1000) user.setLevel("EXPERT");
        else if (currentXp > 500) user.setLevel("PRO");
        else if (currentXp > 200) user.setLevel("INTERMEDIATE");
        userRepository.save(user);
    }
}
