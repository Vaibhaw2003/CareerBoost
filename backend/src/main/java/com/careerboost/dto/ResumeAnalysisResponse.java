package com.careerboost.dto;

import java.util.List;

public class ResumeAnalysisResponse {
    private int score;
    private List<String> strengths;
    private List<String> weaknesses;
    private List<String> suggestions;
    private int hiringProbability;

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public List<String> getStrengths() {
        return strengths;
    }

    public void setStrengths(List<String> strengths) {
        this.strengths = strengths;
    }

    public List<String> getWeaknesses() {
        return weaknesses;
    }

    public void setWeaknesses(List<String> weaknesses) {
        this.weaknesses = weaknesses;
    }

    public List<String> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<String> suggestions) {
        this.suggestions = suggestions;
    }

    public int getHiringProbability() {
        return hiringProbability;
    }

    public void setHiringProbability(int hiringProbability) {
        this.hiringProbability = hiringProbability;
    }
}
