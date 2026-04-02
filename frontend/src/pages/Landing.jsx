import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, FileText, Mic, Target, Zap, ChevronRight, CheckCircle, Sparkles, TrendingUp, Mail, ArrowRight, Heart, MapPin, Phone, Globe, Send, Shield, Award, Users, Code, ExternalLink, MessageCircle } from 'lucide-react';

export default function Landing() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

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

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    const footerLinks = {
        Product: [
            { name: 'Resume Analyzer', href: '/resume-analyzer' },
            { name: 'Resume Roast', href: '/resume-roast' },
            { name: 'Interview Prep', href: '/interview-prep' },
            { name: 'Career Roadmap', href: '/career-roadmap' },
            { name: 'Project Builder', href: '/project-builder' },
            { name: 'Personal Branding', href: '/personal-branding' },
        ],
        Company: [
            { name: 'About Us', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Blog', href: '#' },
            { name: 'Press Kit', href: '#' },
            { name: 'Contact', href: '#' },
        ],
        Resources: [
            { name: 'Documentation', href: '#' },
            { name: 'Help Center', href: '#' },
            { name: 'Community', href: '#' },
            { name: 'API Reference', href: '#' },
            { name: 'Status', href: '#' },
        ],
        Legal: [
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' },
            { name: 'Cookie Policy', href: '#' },
            { name: 'GDPR', href: '#' },
        ],
    };

    const socialLinks = [
        { icon: Code, href: '#', label: 'GitHub', hoverColor: 'hover:text-white hover:bg-white/10' },
        { icon: ExternalLink, href: '#', label: 'LinkedIn', hoverColor: 'hover:text-blue-400 hover:bg-blue-400/10' },
        { icon: MessageCircle, href: '#', label: 'Twitter', hoverColor: 'hover:text-sky-400 hover:bg-sky-400/10' },
        { icon: Mail, href: '#', label: 'Email', hoverColor: 'hover:text-primary-400 hover:bg-primary-400/10' },
    ];

    const stats = [
        { icon: Users, value: '50K+', label: 'Active Users' },
        { icon: Award, value: '95%', label: 'Success Rate' },
        { icon: Shield, value: '100%', label: 'Data Secure' },
        { icon: Globe, value: '120+', label: 'Countries' },
    ];

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

            {/* ═══════════════════════════════════════════ */}
            {/*                  FOOTER                     */}
            {/* ═══════════════════════════════════════════ */}
            <footer className="relative z-10 border-t border-white/5">

                {/* Stats Banner */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-7xl mx-auto px-8 py-16"
                >
                    <div className="glass-premium rounded-3xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="text-center group"
                            >
                                <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <stat.icon className="w-6 h-6 text-primary-400" />
                                </div>
                                <div className="text-3xl md:text-4xl font-black text-gradient mb-1">{stat.value}</div>
                                <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA + Newsletter */}
                <div className="max-w-7xl mx-auto px-8 pb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center"
                        style={{
                            background: 'linear-gradient(135deg, rgba(67, 97, 238, 0.15) 0%, rgba(114, 9, 183, 0.15) 50%, rgba(0, 180, 216, 0.1) 100%)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}
                    >
                        {/* Decorative orbs */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl pointer-events-none"></div>

                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 relative z-10">
                            Ready to <span className="text-gradient">Supercharge</span> Your Career?
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10">
                            Join thousands of professionals using AI to land their dream jobs faster. Get weekly tips & updates.
                        </p>

                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto relative z-10">
                            <div className="relative w-full">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input 
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-dark-800/80 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all text-base"
                                    required
                                />
                            </div>
                            <button 
                                type="submit"
                                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-500 text-white font-bold rounded-2xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                {subscribed ? (
                                    <><CheckCircle className="w-5 h-5" /> Subscribed!</>
                                ) : (
                                    <><Send className="w-5 h-5" /> Subscribe</>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Main Footer Grid */}
                <div className="max-w-7xl mx-auto px-8 pb-16">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-6 gap-12 md:gap-8"
                    >
                        {/* Brand Column */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-extrabold text-gradient">CareerBoost AI</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
                                The AI-powered career intelligence platform that helps you analyze resumes, practice interviews, and build personalized career roadmaps.
                            </p>

                            {/* Social Links */}
                            <div className="flex items-center gap-3">
                                {socialLinks.map((social, i) => (
                                    <motion.a
                                        key={i}
                                        href={social.href}
                                        aria-label={social.label}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 transition-all duration-300 ${social.hoverColor}`}
                                    >
                                        <social.icon className="w-4 h-4" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Link Columns */}
                        {Object.entries(footerLinks).map(([category, links], i) => (
                            <div key={category}>
                                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">{category}</h4>
                                <ul className="space-y-3">
                                    {links.map((link, j) => (
                                        <li key={j}>
                                            <Link 
                                                to={link.href}
                                                className="text-gray-400 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} CareerBoost AI. All rights reserved.
                        </p>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                            Made with <Heart className="w-3.5 h-3.5 text-red-500 mx-1 animate-pulse" /> by CareerBoost Team
                        </div>
                        <div className="flex items-center gap-6">
                            <Link to="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Privacy</Link>
                            <Link to="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Terms</Link>
                            <Link to="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Cookies</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
