import React, { useState } from 'react';
import api from '../api/axios';
import { Loader, Code2, PlusCircle, Check, Briefcase } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ProjectBuilder() {
  const [techStack, setTechStack] = useState('');
  const [level, setLevel] = useState('Intermediate');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async () => {
    if(!techStack) return;
    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.post('/ai/projects', { techStack, level });
      setResult(data); 
      toast.success('Generated project ideas!');
    } catch (error) {
      toast.error('Failed to generate projects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent flex items-center gap-3">
             <Code2 className="w-8 h-8 text-accent-500" /> AI Project Builder
        </h1>
        <p className="text-gray-400 mt-2">Generate resume-ready, real-world portfolio project ideas based on your tech stack.</p>
      </div>

      <div className="glass-dark rounded-2xl p-6 mb-8 border border-white/5 flex flex-col md:flex-row gap-4 items-end">
         <div className="flex-1 w-full">
            <label className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2 block">Your Tech Stack</label>
            <input type="text" className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all" placeholder="React, Node.js, Next.js, Python..." value={techStack} onChange={(e) => setTechStack(e.target.value)} />
         </div>
         <div className="w-full md:w-64">
            <label className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2 block">Level</label>
            <select className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-dark-900 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all" value={level} onChange={(e) => setLevel(e.target.value)}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
            </select>
         </div>
         <button onClick={handleGenerate} disabled={loading} className="w-full md:w-auto h-12 px-8 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? <Loader className="w-5 h-5 animate-spin" /> : 'Build Ideas'}
         </button>
      </div>

      {result && Array.isArray(result) && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-6">
          {result.map((project, i) => (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{delay: i * 0.1}} key={i} className="glass rounded-2xl p-6 md:p-8 border-t border-accent-500/20 shadow-lg relative overflow-hidden group hover:bg-white/5 transition-all">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent-500 rounded-l-2xl"></div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-6">{project.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="flex items-center gap-2 text-sm font-bold text-accent-400 uppercase tracking-wider mb-3">
                            <PlusCircle className="w-4 h-4" /> Core Features
                        </h4>
                        <ul className="space-y-2">
                            {project.features.map((f, j) => (
                                <li key={j} className="text-sm text-gray-400 flex items-start gap-2">
                                    <div className="min-w-1.5 w-1.5 h-1.5 rounded-full bg-accent-400 mt-1.5"></div>
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="flex items-center gap-2 text-sm font-bold text-primary-400 uppercase tracking-wider mb-3">
                            <Briefcase className="w-4 h-4" /> Resume Bullet Points
                        </h4>
                        <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                            <ul className="space-y-3">
                                {project.resumePoints.map((p, j) => (
                                    <li key={j} className="text-sm text-gray-300 flex items-start gap-2">
                                        <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
