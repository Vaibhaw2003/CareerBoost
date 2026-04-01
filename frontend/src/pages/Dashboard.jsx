import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  Activity, 
  Award, 
  FileText, 
  Mic, 
  ChevronRight,
  TrendingUp,
  Clock 
} from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, historyRes] = await Promise.all([
          api.get('/dashboard'),
          api.get('/resume/history')
        ]);
        setStats(statsRes.data);
        setHistory(historyRes.data);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium animate-pulse">Initializing Interface...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full pb-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-premium rounded-3xl p-8 mb-8 border border-white/10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <h1 className="text-3xl font-extrabold text-white mb-2 relative z-10">
          Welcome back, <span className="text-gradient">{user?.name?.split(' ')[0] || 'User'}</span>! 👋
        </h1>
        <p className="text-gray-400 font-medium relative z-10">Here's a breakdown of your career growth and remaining api credits.</p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <motion.div variants={itemVariants} className="glass-panel shadow-lg p-6 rounded-2xl flex items-center gap-5 border border-white/5 relative overflow-hidden group hover:border-primary-500/30 transition-colors">
          <div className="absolute top-[-50%] right-[-10%] w-24 h-24 bg-primary-500/10 rounded-full blur-2xl group-hover:bg-primary-500/20 transition-all"></div>
          <div className="w-14 h-14 rounded-2xl bg-primary-500/10 text-primary-400 flex items-center justify-center shadow-inner relative z-10">
            <Zap className="w-7 h-7" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">XP Points</p>
            <p className="text-3xl font-black text-white">{stats?.xpPoints || 0}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel shadow-lg p-6 rounded-2xl flex items-center gap-5 border border-white/5 relative overflow-hidden group hover:border-accent-500/30 transition-colors">
          <div className="absolute top-[-50%] right-[-10%] w-24 h-24 bg-accent-500/10 rounded-full blur-2xl group-hover:bg-accent-500/20 transition-all"></div>
          <div className="w-14 h-14 rounded-2xl bg-accent-500/10 text-accent-400 flex items-center justify-center shadow-inner relative z-10">
            <Award className="w-7 h-7" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Current Level</p>
            <p className="text-2xl font-black text-white">{stats?.level || 'NEW'}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel shadow-lg p-6 rounded-2xl flex items-center gap-5 border border-white/5 relative overflow-hidden group hover:border-green-500/30 transition-colors">
          <div className="absolute top-[-50%] right-[-10%] w-24 h-24 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all"></div>
          <div className="w-14 h-14 rounded-2xl bg-green-500/10 text-green-400 flex items-center justify-center shadow-inner relative z-10">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Resumes</p>
            <p className="text-3xl font-black text-white">{stats?.resumeAnalysesCount || 0}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel shadow-lg p-6 rounded-2xl flex items-center gap-5 border border-white/5 relative overflow-hidden group hover:border-secondary-500/30 transition-colors">
          <div className="absolute top-[-50%] right-[-10%] w-24 h-24 bg-secondary-500/10 rounded-full blur-2xl group-hover:bg-secondary-500/20 transition-all"></div>
          <div className="w-14 h-14 rounded-2xl bg-secondary-500/10 text-secondary-400 flex items-center justify-center shadow-inner relative z-10">
            <Activity className="w-7 h-7" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">API Usage</p>
            <p className="text-3xl font-black text-white">{stats?.usageCount || 0}</p>
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-400" /> Recent AI Activity
            </h2>
            <Link to="/resume-analyzer" className="text-sm font-medium text-primary-400 hover:text-primary-300">View All</Link>
          </div>

          <div className="glass-panel shadow-lg rounded-3xl border border-white/10 overflow-hidden">
            {history.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">No activity yet</h3>
                <p className="text-gray-400 text-sm max-w-sm mx-auto">You haven't analyzed any resumes yet. Upload your first resume to see the magic happen.</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {history.slice(0, 5).map((item, index) => (
                  <div key={item.id || index} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                         {item.roastMode ? <Zap className="w-5 h-5 text-secondary-400" /> : <FileText className="w-5 h-5 text-primary-400" />}
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1 truncate max-w-[200px] md:max-w-xs">{item.fileName || 'Resume.pdf'}</p>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">{new Date(item.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center justify-center px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm font-bold">
                         <span className={item.score > 70 ? 'text-accent-400' : 'text-yellow-400'}>{item.score}/100</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-bold text-white">Quick Actions</h2>
          
          <Link to="/resume-analyzer" className="block p-6 glass-panel shadow-lg rounded-3xl border border-white/10 hover:-translate-y-1 hover:border-primary-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-primary-500/20 text-primary-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white mb-2 flex items-center justify-between">
              Scan Resume <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-sm text-gray-400">Get instant ATS scoring and actionable feedback.</p>
          </Link>

          <Link to="/interview-prep" className="block p-6 glass-panel shadow-lg rounded-3xl border border-white/10 hover:-translate-y-1 hover:border-secondary-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-secondary-500/20 text-secondary-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white mb-2 flex items-center justify-between">
              Mock Interview <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-secondary-400 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-sm text-gray-400">Practice answering technical questions like a pro.</p>
          </Link>

          <Link to="/career-roadmap" className="block p-6 glass-panel shadow-lg rounded-3xl border border-white/10 hover:-translate-y-1 hover:border-accent-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-accent-500/20 text-accent-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white mb-2 flex items-center justify-between">
              Build Roadmap <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-accent-400 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-sm text-gray-400">Generate a step-by-step learning path to your dream job.</p>
          </Link>
        </motion.div>
      </div>

    </div>
  );
}
