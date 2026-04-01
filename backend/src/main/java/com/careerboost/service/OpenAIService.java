package com.careerboost.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@SuppressWarnings("unchecked")
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.model}")
    private String model;

    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";
    private final RestTemplate restTemplate;

    public OpenAIService() {
        this.restTemplate = new RestTemplate();
    }

    public String callChatAPI(String systemPrompt, String userMessage) {
        if (apiKey == null || apiKey.isEmpty() || apiKey.equals("YOUR_OPENAI_API_KEY")) {
            System.err.println("WARNING: OpenAI API key is not configured. Returning mock JSON response for testing.");
            
            if (systemPrompt.contains("interviewer")) {
                return "[ { \"question\": \"Can you describe a time you had to optimize a slow-performing application?\", \"answer\": \"I used a profiler to identify a slow database query, then added an index and implemented Redis caching, which reduced latency by 80%.\" }, { \"question\": \"How do you handle disagreements with a product manager?\", \"answer\": \"I focus on data and user impact. If we disagree, I propose an A/B test or validate the assumption with actual metrics to make an objective decision.\" } ]";
            } else if (systemPrompt.contains("career coach")) {
                return "{ \"title\": \"Full Stack Developer Career Roadmap\", \"weeks\": [ { \"week\": 1, \"focus\": \"Advanced React Patterns\", \"tasks\": [\"Learn Custom Hooks\", \"Master Context API\"] }, { \"week\": 2, \"focus\": \"Backend Architecture\", \"tasks\": [\"Build REST APIs with Spring Boot\", \"Learn MongoDB Aggregations\"] } ] }";
            } else if (systemPrompt.contains("Senior Tech Lead")) {
                return "[ { \"title\": \"AI SaaS Dashboard\", \"description\": \"A full-stack resume analyzing dashboard with JWT auth.\", \"features\": [\"Authentication\", \"PDF Parsing\", \"MongoDB Integration\"], \"resumePoints\": [\"Built a SaaS serving 1k users\", \"Integrated OpenAI APIs\"] } ]";
            } else if (systemPrompt.contains("branding expert")) {
                return "{ \"content\": \"Hi, I'm a passionate developer focused on building scalable, user-centric web applications. Specializing in React and Spring Boot, I turn complex problems into elegant solutions.\" }";
            } else if (systemPrompt.contains("comedian")) {
                return "{ \"score\": 45, \"strengths\": [\"You managed to spell your name correctly\"], \"weaknesses\": [\"Used comic sans\", \"Listed 'Sleeping' as a skill\", \"Zero quantifiable metrics\"], \"suggestions\": [\"Delete this resume and start over\", \"Try using active verbs instead of passive tears\"], \"hiringProbability\": 12 }";
            } else {
                return "{ \"score\": 85, \"strengths\": [\"Clear formatting\", \"Good use of Java and React\", \"Detailed project descriptions\"], \"weaknesses\": [\"Missing impact metrics in work history\", \"Too many bullet points\"], \"suggestions\": [\"Add quantifiable metrics (e.g. increased efficiency by 20%)\", \"Shorten generic experience descriptions\"], \"hiringProbability\": 78 }";
            }
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", model);
        requestBody.put("messages", List.of(
                Map.of("role", "system", "content", systemPrompt),
                Map.of("role", "user", "content", userMessage)
        ));
        requestBody.put("temperature", 0.7);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, HttpHeaders.readOnlyHttpHeaders(headers));

        try {
            Map<String, Object> response = restTemplate.postForObject(OPENAI_URL, request, Map.class);
            
            if (response != null && response.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                    return (String) message.get("content");
                }
            }
            return "{}";
        } catch (Exception e) {
            System.err.println("Error calling OpenAI: " + e.getMessage());
            throw new RuntimeException("Failed to generate AI response", e);
        }
    }
}
