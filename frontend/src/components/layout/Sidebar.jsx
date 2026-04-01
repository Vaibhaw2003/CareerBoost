import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Flame, 
  MessageSquare, 
  Map, 
  Code, 
  Briefcase, 
  Mic, 
  LogOut,
  Star
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Resume Analyzer', path: '/resume-analyzer', icon: FileText },
    { name: 'Resume Roast', path: '/resume-roast', icon: Flame },
    { name: 'Interview Prep', path: '/interview-prep', icon: MessageSquare },
    { name: 'Voice Interview', path: '/voice-mock-interview', icon: Mic },
    { name: 'Career Roadmap', path: '/career-roadmap', icon: Map },
    { name: 'Project Builder', path: '/project-builder', icon: Code },
    { name: 'Branding', path: '/personal-branding', icon: Briefcase },
    { name: 'Upgrade to PRO', path: '/pricing', icon: Star },
  ];

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="w-64 glass-premium border-r border-white/5 h-screen fixed top-0 left-0 flex flex-col pt-8 z-50 shadow-2xl"
    >
      <div className="px-6 mb-8 text-center sm:text-left">
        <h2 className="text-3xl font-extrabold text-gradient tracking-tight">
          CareerBoost
        </h2>
        <div className="inline-block mt-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs text-primary-400 uppercase font-semibold tracking-wider">
          {user?.plan || 'Free'} PLAN
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 + 0.2 }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                  isActive 
                    ? 'bg-gradient-to-r from-primary-500/20 to-transparent text-primary-400 border-l-2 border-primary-500' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white hover:border-l-2 hover:border-white/20 border-l-2 border-transparent'
                }`
              }
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold text-sm">{item.name}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 mt-auto bg-dark-900/30">
        <motion.div 
           whileHover={{ scale: 1.02 }}
           className="flex items-center gap-3 px-3 py-3 mb-4 rounded-xl glass hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center font-bold text-white shadow-lg animate-pulse-glow">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-accent-400 font-medium truncate">Level: {user?.level || 'NEW'}</p>
          </div>
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold text-red-400 hover:text-white hover:bg-red-500/20 rounded-xl transition-all border border-transparent hover:border-red-500/30"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </motion.button>
      </div>
    </motion.div>
  );
}
