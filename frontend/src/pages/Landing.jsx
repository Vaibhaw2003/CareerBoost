import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, FileText, Mic, Target, Zap, ChevronRight, CheckCircle, Sparkles, TrendingUp } from 'lucide-react';

export default function Landing() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <div className="min-h-screen bg-dark-950 overflow-hidden relative selection:bg-primary-500/30 text-white font-sans">

            <nav className="relative z-50 px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3"
                >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
                        <Bot className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-3xl font-extrabold text-gradient tracking-tight">CareerBoost AI</span>
                </motion.div>
                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-6"
                >
                    <Link to="/login" className="text-gray-300 hover:text-white font-semibold transition-colors hidden sm:block">Sign in</Link>
                    <Link to="/register" className="glass-premium border border-white/20 px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors shadow-xl">Get Started</Link>
                </motion.div>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-32">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center max-w-5xl mx-auto mb-20"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-secondary-500/30 bg-secondary-500/10 text-secondary-300 font-semibold text-sm mb-10 shadow-lg shadow-secondary-500/10">
                        <Sparkles className="w-4 h-4 text-secondary-400 animate-pulse" />
                        Next-Generation Career Intelligence Platform
                    </motion.div>
                    
                    <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                        Hack Your Way To <br/>
                        <span className="text-gradient">Dream Roles</span>
                    </motion.h1>
                    
                    <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
                        Stop guessing what recruiters want. Leverage <span className="text-white">AI-driven resume parsing</span>, voice-enabled mock interviews, and hyper-personalized career roadmaps.
                    </motion.p>
                    
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="/register" className="group w-full sm:w-auto px-10 py-5 bg-white text-dark-950 hover:bg-gray-100 rounded-full font-extrabold text-lg transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3">
                            Start for Free <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/pricing" className="w-full sm:w-auto px-10 py-5 glass-premium rounded-full font-extrabold text-lg hover:bg-white/10 transition-all text-white flex items-center justify-center gap-3">
                            View Pricing
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Grid Section */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20"
                >
                    {[
                        { icon: FileText, title: 'AI Resume Roaster', desc: 'Get an instant ATS score, brutal roast, and intelligent suggestions that actually bypass filters.', color: 'text-primary-400', bg: 'bg-primary-500/10', border: 'border-primary-500/20' },
                        { icon: Mic, title: 'Voice Mock Interviews', desc: 'Practice behavioral questions using speech recognition and get real-time NLP feedback.', color: 'text-secondary-400', bg: 'bg-secondary-500/10', border: 'border-secondary-500/20' },
                        { icon: Target, title: 'Career Roadmaps', desc: 'Generate step-by-step weekly plans to learn new stacks and land your dream tech job.', color: 'text-accent-400', bg: 'bg-accent-500/10', border: 'border-accent-500/20' },
                    ].map((feature, i) => (
                        <motion.div 
                            key={i} 
                            variants={itemVariants}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className={`glass-panel border-t ${feature.border} p-10 rounded-3xl transition-all duration-300 relative overflow-hidden group`}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
                            <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 relative z-10 shadow-lg`}>
                                <feature.icon className={`w-8 h-8 ${feature.color}`} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{feature.title}</h3>
                            <p className="text-gray-400 text-lg leading-relaxed relative z-10">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </main>
        </div>
    );
}
