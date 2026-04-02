package com.careerboost.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

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

    public boolean isApiKeyConfigured() {
        return apiKey != null && !apiKey.trim().isEmpty() && !apiKey.equals("YOUR_OPENAI_API_KEY");
    }

    public String callChatAPI(String systemPrompt, String userMessage) {
        if (!isApiKeyConfigured()) {
            System.out.println("OpenAI API key not configured. Using smart demo mode.");
            return generateDemoResponse(systemPrompt, userMessage);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", model);
        requestBody.put("messages", List.of(
                Map.of("role", "system", "content", systemPrompt),
                Map.of("role", "user", "content", userMessage)));
        requestBody.put("temperature", 0.7);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody,
                HttpHeaders.readOnlyHttpHeaders(headers));

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

    /**
     * Smart demo mode: Generates realistic mock responses based on the feature
     * requested.
     */
    private String generateDemoResponse(String systemPrompt, String userMessage) {
        String promptLower = systemPrompt.toLowerCase() + " " + userMessage.toLowerCase();

        // 1. Roadmap Generator
        if (promptLower.contains("roadmap") || promptLower.contains("step-by-step career")) {
            return "{" +
                    "\"title\": \"Your Path to Success\"," +
                    "\"weeks\": [" +
                    "  {\"week\": 1, \"focus\": \"Fundamentals & Foundation\", \"tasks\": [\"Review core concepts and terminology related to the goal.\", \"Set up necessary tools, environments, and accounts.\", \"Identify 3 key resources (books, courses) to digest.\"]}, "
                    +
                    "  {\"week\": 2, \"focus\": \"Hands-On Practice\", \"tasks\": [\"Build a small 'Hello World' project.\", \"Join relevant online communities or forums.\", \"Study common pitfalls and best practices.\"]}, "
                    +
                    "  {\"week\": 3, \"focus\": \"Advanced Topics\", \"tasks\": [\"Deep dive into complex aspects of your goal.\", \"Start a moderate-complexity portfolio project.\", \"Seek feedback from peers or mentors.\"]}, "
                    +
                    "  {\"week\": 4, \"focus\": \"Polish & Presentation\", \"tasks\": [\"Finalize your portfolio project.\", \"Update your resume and LinkedIn to reflect new skills.\", \"Apply for entry-level roles or freelance gigs.\"]}"
                    +
                    "]" +
                    "}";
        }

        // 2. Interview Questions
        if (promptLower.contains("interview questions") || promptLower.contains("technical interviewer")) {
            return "[" +
                    "  {\"question\": \"Tell me about a time you faced a difficult technical challenge. How did you overcome it?\", \"answer\": \"Use the STAR method: Situation, Task, Action, Result. Focus on the actual steps you took.\"},"
                    +
                    "  {\"question\": \"Can you explain the core difference between monolithic and microservices architectures?\", \"answer\": \"Monoliths are single unified units; microservices are loosely coupled services. Discuss scaling tradeoffs.\"},"
                    +
                    "  {\"question\": \"How do you ensure the code you write is maintainable and scalable?\", \"answer\": \"Mention SOLID principles, writing unit/integration tests, meaningful variable names, and code reviews.\"},"
                    +
                    "  {\"question\": \"Describe how you handle disagreements with team members or stakeholders.\", \"answer\": \"Highlight active listening, providing data-backed evidence, and committing to the final team decision.\"},"
                    +
                    "  {\"question\": \"Where do you see your career heading in the next 3-5 years?\", \"answer\": \"Show ambition but realism. Focus on mastering your current stack and gradually taking on leadership or architectural responsibilities.\"}"
                    +
                    "]";
        }

        // 3. Project Ideas
        if (promptLower.contains("project ideas") || promptLower.contains("portfolio project")) {
            return "[" +
                    "  {\"title\": \"AI-Powered Task Manager\", \"description\": \"A full-stack app that automatically prioritizes tasks based on deadlines and estimated effort using simple heuristics.\", \"features\": [\"User Auth\", \"Task CRUD\", \"Auto-priority sorting\", \"Dashboard analytics\"], \"resumePoints\": [\"Built a React/Node app prioritizing tasks for 100+ simulated users\", \"Implemented JWT authentication and state management\"]},"
                    +
                    "  {\"title\": \"Real-Time Collaborative Markdown Editor\", \"description\": \"A web app where multiple users can edit technical documentation simultaneously.\", \"features\": [\"WebSockets for real-time sync\", \"Markdown parsing\", \"Access control\"], \"resumePoints\": [\"Integrated WebSocket architecture reducing latency to <50ms\", \"Engineered collision-handling for concurrent document edits\"]},"
                    +
                    "  {\"title\": \"E-Commerce Price Tracker\", \"description\": \"A web scraper and dashboard that monitors product prices across multiple retail sites and emails alerts.\", \"features\": [\"Web scraping cron jobs\", \"Price history charts\", \"Email notifications\"], \"resumePoints\": [\"Developed automated web scrapers saving users average 15% on purchases\", \"Configured cron jobs and third-party email APIs\"]}"
                    +
                    "]";
        }

        // 4. Personal Branding
        if (promptLower.contains("branding") || promptLower.contains("linkedin post")
                || promptLower.contains("world-class personal branding")) {
            return "{" +
                    "\"content\": \"🚀 **Excited to share the next step in my journey!**\\n\\nI've been diving deep into mastering new skills and pushing my limits. The learning curve is steep, but the view is definitely worth it.\\n\\nKey takeaways so far:\\n✓ Consistency beats intensity\\n✓ Community support is everything\\n✓ Don't be afraid to break things to learn how they work\\n\\nWhat are you currently learning? Drop it in the comments below! 👇\\n\\n#CareerGrowth #AlwaysLearning #TechJourney\""
                    +
                    "}";
        }

        // 5. Default: Resume Analyzer (fallback)
        boolean isRoast = promptLower.contains("roast") || promptLower.contains("comedian");
        String textLower = userMessage.toLowerCase();
        int textLength = userMessage.length();

        // ── Detect skills and keywords ──
        Map<String, List<String>> skillCategories = new LinkedHashMap<>();
        skillCategories.put("Programming", List.of("java", "python", "javascript", "typescript", "c++", "c#", "go",
                "rust", "kotlin", "swift", "ruby", "php", "scala"));
        skillCategories.put("Frontend", List.of("react", "angular", "vue", "html", "css", "tailwind", "bootstrap",
                "next.js", "nextjs", "svelte"));
        skillCategories.put("Backend",
                List.of("spring", "node", "express", "django", "flask", "fastapi", ".net", "rails", "laravel"));
        skillCategories.put("Database",
                List.of("sql", "mongodb", "postgresql", "mysql", "redis", "elasticsearch", "dynamodb", "firebase"));
        skillCategories.put("Cloud",
                List.of("aws", "azure", "gcp", "docker", "kubernetes", "terraform", "jenkins", "ci/cd", "devops"));
        skillCategories.put("AI/ML", List.of("machine learning", "deep learning", "tensorflow", "pytorch", "nlp",
                "computer vision", "data science"));

        List<String> foundSkills = new ArrayList<>();
        Map<String, Integer> categoryCount = new LinkedHashMap<>();

        for (Map.Entry<String, List<String>> entry : skillCategories.entrySet()) {
            int count = 0;
            for (String skill : entry.getValue()) {
                if (textLower.contains(skill)) {
                    foundSkills.add(skill);
                    count++;
                }
            }
            if (count > 0) {
                categoryCount.put(entry.getKey(), count);
            }
        }

        // ── Detect resume sections ──
        boolean hasExperience = textLower.contains("experience") || textLower.contains("work history")
                || textLower.contains("employment");
        boolean hasEducation = textLower.contains("education") || textLower.contains("degree")
                || textLower.contains("university") || textLower.contains("bachelor") || textLower.contains("master");
        boolean hasProjects = textLower.contains("project") || textLower.contains("portfolio");
        boolean hasCertifications = textLower.contains("certif") || textLower.contains("certified")
                || textLower.contains("certification");
        boolean hasContact = textLower.contains("email") || textLower.contains("phone")
                || textLower.contains("linkedin") || textLower.contains("github");
        boolean hasSummary = textLower.contains("summary") || textLower.contains("objective")
                || textLower.contains("about me") || textLower.contains("profile");
        boolean hasMetrics = textLower.contains("%") || textLower.contains("increased") || textLower.contains("reduced")
                || textLower.contains("improved") || textLower.contains("achieved");
        boolean hasActionVerbs = textLower.contains("developed") || textLower.contains("implemented")
                || textLower.contains("designed") || textLower.contains("managed") || textLower.contains("led")
                || textLower.contains("built");

        // ── Calculate score ──
        int score = 40; // Base score
        if (foundSkills.size() >= 5)
            score += 12;
        else if (foundSkills.size() >= 3)
            score += 8;
        else if (foundSkills.size() >= 1)
            score += 4;

        if (hasExperience)
            score += 10;
        if (hasEducation)
            score += 8;
        if (hasProjects)
            score += 7;
        if (hasCertifications)
            score += 5;
        if (hasContact)
            score += 3;
        if (hasSummary)
            score += 5;
        if (hasMetrics)
            score += 8;
        if (hasActionVerbs)
            score += 5;
        if (textLength > 1500)
            score += 3;
        if (textLength > 500 && textLength < 4000)
            score += 2;
        if (categoryCount.size() >= 3)
            score += 5;

        // Cap score
        score = Math.min(score, 95);
        int hiringProbability = Math.min(score + (int) (Math.random() * 10) - 5, 95);
        hiringProbability = Math.max(hiringProbability, 15);

        // ── Build strengths ──
        List<String> strengths = new ArrayList<>();
        if (foundSkills.size() >= 5) {
            strengths.add("Strong technical skill set with " + foundSkills.size()
                    + " relevant technologies identified including "
                    + String.join(", ", foundSkills.subList(0, Math.min(4, foundSkills.size()))));
        } else if (foundSkills.size() >= 2) {
            strengths.add("Good technical foundation with skills in " + String.join(", ", foundSkills));
        }
        if (categoryCount.size() >= 3) {
            strengths.add("Well-rounded profile covering " + String.join(", ", categoryCount.keySet()) + " domains");
        }
        if (hasExperience)
            strengths.add("Professional experience section is present, which is essential for ATS systems");
        if (hasEducation)
            strengths.add("Educational background is clearly documented");
        if (hasProjects)
            strengths.add("Project portfolio demonstrates hands-on implementation ability");
        if (hasCertifications)
            strengths.add("Professional certifications add credibility and show continuous learning");
        if (hasMetrics)
            strengths.add("Quantifiable achievements help recruiters gauge impact (great use of metrics!)");
        if (hasActionVerbs)
            strengths.add("Good use of action verbs to describe accomplishments");
        if (hasSummary)
            strengths.add("Professional summary provides a quick snapshot for recruiters");

        if (strengths.isEmpty()) {
            strengths.add("Resume contains relevant content that can be restructured for better impact");
        }

        // ── Build weaknesses ──
        List<String> weaknesses = new ArrayList<>();
        if (!hasSummary)
            weaknesses.add(
                    "Missing a professional summary or objective section — recruiters spend only 7 seconds on initial scan");
        if (!hasMetrics)
            weaknesses.add(
                    "Lacks quantifiable metrics and numbers — use data like 'improved performance by 30%' to show impact");
        if (foundSkills.size() < 3)
            weaknesses.add("Limited technical keywords detected — ATS systems may not rank this resume highly");
        if (!hasProjects)
            weaknesses.add(
                    "No dedicated projects section — showcasing personal or open-source projects can differentiate you");
        if (!hasCertifications)
            weaknesses.add("No certifications mentioned — industry certifications can boost credibility");
        if (!hasContact)
            weaknesses.add("Contact information may be incomplete — ensure LinkedIn and GitHub profiles are included");
        if (textLength < 500)
            weaknesses.add("Resume appears too short — consider elaborating on experiences and skills");
        if (textLength > 4000)
            weaknesses.add("Resume may be too lengthy — try to keep it concise and within 1-2 pages");
        if (!hasActionVerbs)
            weaknesses.add(
                    "Consider using stronger action verbs like 'developed', 'implemented', 'designed' to describe achievements");

        if (weaknesses.isEmpty()) {
            weaknesses.add("Minor formatting improvements could further enhance readability");
        }

        // ── Build suggestions ──
        List<String> suggestions = new ArrayList<>();
        suggestions.add("Tailor your resume for each job application by matching keywords from the job description");
        if (!hasMetrics)
            suggestions.add(
                    "Add quantifiable achievements (e.g., 'Reduced API response time by 40%', 'Managed a team of 5 engineers')");
        if (!hasSummary)
            suggestions.add(
                    "Add a 2-3 line professional summary at the top highlighting your years of experience and key strengths");
        if (foundSkills.size() < 5)
            suggestions.add(
                    "Expand your technical skills section — include specific frameworks, tools, and technologies you've worked with");
        if (!hasProjects)
            suggestions.add("Add a projects section showcasing 2-3 impactful projects with tech stack and outcomes");
        suggestions.add(
                "Use a clean, ATS-friendly format with standard section headings (Experience, Education, Skills, Projects)");
        if (!hasCertifications)
            suggestions.add(
                    "Consider adding relevant certifications (e.g., AWS Certified, Google Cloud, Oracle Java) to stand out");
        suggestions.add(
                "Ensure consistent formatting — use the same date format, font sizes, and bullet styles throughout");
        if (categoryCount.size() < 2)
            suggestions.add("Diversify your skill set to show full-stack or cross-domain capability");

        // Limit lists
        strengths = strengths.subList(0, Math.min(strengths.size(), 5));
        weaknesses = weaknesses.subList(0, Math.min(weaknesses.size(), 5));
        suggestions = suggestions.subList(0, Math.min(suggestions.size(), 5));

        // ── Apply roast mode flavor ──
        if (isRoast) {
            List<String> roastedWeaknesses = new ArrayList<>();
            for (String w : weaknesses) {
                roastedWeaknesses.add("🔥 " + w);
            }
            weaknesses = roastedWeaknesses;

            if (score > 70)
                score -= 10; // Roast mode is harsher
            hiringProbability = Math.max(hiringProbability - 10, 10);
        }

        // ── Build JSON response ──
        StringBuilder json = new StringBuilder();
        json.append("{");
        json.append("\"score\":").append(score).append(",");
        json.append("\"hiringProbability\":").append(hiringProbability).append(",");
        json.append("\"strengths\":[");
        for (int i = 0; i < strengths.size(); i++) {
            if (i > 0)
                json.append(",");
            json.append("\"").append(escapeJson(strengths.get(i))).append("\"");
        }
        json.append("],");
        json.append("\"weaknesses\":[");
        for (int i = 0; i < weaknesses.size(); i++) {
            if (i > 0)
                json.append(",");
            json.append("\"").append(escapeJson(weaknesses.get(i))).append("\"");
        }
        json.append("],");
        json.append("\"suggestions\":[");
        for (int i = 0; i < suggestions.size(); i++) {
            if (i > 0)
                json.append(",");
            json.append("\"").append(escapeJson(suggestions.get(i))).append("\"");
        }
        json.append("]");
        json.append("}");

        return json.toString();
    }

    private String escapeJson(String text) {
        return text.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }
}
