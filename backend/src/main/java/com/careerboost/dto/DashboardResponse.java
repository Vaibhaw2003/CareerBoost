package com.careerboost.dto;



public class DashboardResponse {
    private int xpPoints;
    private String level;
    private int usageCount;
    private String plan;
    private int resumeAnalysesCount;

    public int getXpPoints() { return xpPoints; }
    public void setXpPoints(int a) { xpPoints = a; }
    
    public String getLevel() { return level; }
    public void setLevel(String a) { level = a; }
    
    public int getUsageCount() { return usageCount; }
    public void setUsageCount(int a) { usageCount = a; }
    
    public String getPlan() { return plan; }
    public void setPlan(String a) { plan = a; }
    
    public int getResumeAnalysesCount() { return resumeAnalysesCount; }
    public void setResumeAnalysesCount(int a) { resumeAnalysesCount = a; }
}
