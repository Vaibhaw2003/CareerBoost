# Dashboard Implementation Plan

This plan details the implementation of the main SaaS Dashboard (`/dashboard`) for CareerBoost AI. Currently, it exists as a minimal placeholder. We will transform it into a robust, premium control center displaying key gamification stats and recent AI activities.

## Proposed Changes

### [NEW] Dashboard Component
We will create `Dashboard.jsx` incorporating `framer-motion` and the `.glass-panel` UI primitives previously established.

#### API Integrations
1. **Stats Overview**: The dashboard will invoke the existing backend API endpoint `GET /api/dashboard` to retrieve live user usage statistics, including:
   - Total XP Points 
   - Current Level
   - Remaining API Quota / Usage Count
   - Total Resumes Analyzed
2. **Activity Feed**: It will hit `GET /api/resume/history` to load the user's historical resume scans and render them as mini-cards or a timeline, showing their scores at a glance.

#### Design Elements
- Use a robust CSS Grid to cleanly lay out metrics cards at the top.
- Cards will feature hovering micro-animations (`hover:-translate-y-1 hover:scale-105`) using `framer-motion`.
- Deep colors and `lucide-react` icons (e.g., `Zap`, `Star`, `Activity`, `FileText`) will accompany the statistical data to ensure it feels vibrant and high-tech.
- Use `react-router-dom` links for "Quick Actions" leading directly to the Resume Analyzer and Interview Prep tools.

### [MODIFY] App.jsx
Update the routing configuration:
- Remove the inline dummy component `const Dashboard = () => ...`
- Import the real `Dashboard.jsx` from `./pages/Dashboard`.

## Open Questions
- Should the Dashboard restrict components based on the user’s subscription (e.g. gray out some features if they aren't on PRO), or should we just show their global usage limit for now?

## Verification Plan
1. We will verify the components compile without errors.
2. We will physically test the dashboard rendering via the Browser Subagent or manual click-through to assure data is successfully fetched from the backend APIs and rendered beautifully.
