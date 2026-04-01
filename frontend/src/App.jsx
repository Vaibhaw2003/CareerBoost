import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import ResumeRoast from './pages/ResumeRoast';
import InterviewPrep from './pages/InterviewPrep';
import CareerRoadmap from './pages/CareerRoadmap';
import ProjectBuilder from './pages/ProjectBuilder';
import PersonalBranding from './pages/PersonalBranding';
import Pricing from './pages/Pricing';
import AdminDashboard from './pages/admin/AdminDashboard';
import Landing from './pages/Landing';

// Placeholder Pages (To be built in later phases)
const VoiceMockInterview = () => <div className="p-8 text-white">Voice Mock Interview (Coming next)</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white font-sans">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes inside DashboardLayout */}
            <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="resume-analyzer" element={<ResumeAnalyzer />} />
                <Route path="resume-roast" element={<ResumeRoast />} />
                <Route path="interview-prep" element={<InterviewPrep />} />
                <Route path="voice-mock-interview" element={<VoiceMockInterview />} />
                <Route path="career-roadmap" element={<CareerRoadmap />} />
                <Route path="project-builder" element={<ProjectBuilder />} />
                <Route path="personal-branding" element={<PersonalBranding />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="admin" element={<AdminDashboard />} />
            </Route>
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default App;
