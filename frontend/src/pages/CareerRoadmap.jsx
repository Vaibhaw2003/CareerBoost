import React, { useState } from 'react';
import api from '../api/axios';
import { Loader, Map as MapIcon, Target, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function CareerRoadmap() {
  const [goal, setGoal] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.post('/ai/roadmap', { goal, timeframe });
      setResult(data); 
      toast.success('Roadmap generated!');
    } catch (error) {
      toast.error('Failed to generate roadmap');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent flex items-center gap-3">
            <MapIcon className="w-8 h-8 text-secondary-500" /> Career Roadmap Generator
        </h1>
        <p className="text-gray-400 mt-2">Get a step-by-step learning path tailored specifically to your career goals.</p>
      </div>

      <div className="glass-dark rounded-2xl p-6 mb-12 border border-secondary-500/30">
        <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Target className="h-5 w-5 text-gray-500" />
                    </div>
                    <input type="text" required className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary-500 transition-all" placeholder="E.g., Become a Senior React Developer" value={goal} onChange={(e) => setGoal(e.target.value)} />
                </div>
            </div>
            <div className="w-full md:w-64">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-500" />
                    </div>
                    <input type="text" required className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary-500 transition-all" placeholder="E.g., 3 months" value={timeframe} onChange={(e) => setTimeframe(e.target.value)} />
                </div>
            </div>
            <button type="submit" disabled={loading} className="h-11 px-8 rounded-xl bg-secondary-600 hover:bg-secondary-500 text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50 mt-auto">
                {loading ? <Loader className="w-5 h-5 animate-spin" /> : 'Generate'}
            </button>
        </form>
      </div>

      {result && result.weeks && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 relative">
           <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 text-center mb-12">{result.title}</h2>
          
           {/* Timeline Line */}
           <div className="absolute left-8 md:left-1/2 top-24 bottom-0 w-1 bg-gradient-to-b from-secondary-500 to-transparent -translate-x-1/2 rounded-full hidden md:block"></div>

           {result.weeks.map((week, i) => (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} 
                className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
                {/* Invisible spacer for timeline layout */}
                <div className="hidden md:block flex-1"></div>
                
                {/* Timeline Dot */}
                <div className="w-10 h-10 rounded-full bg-dark-900 border-4 border-secondary-500 flex items-center justify-center font-bold text-secondary-400 z-10 shrink-0 shadow-[0_0_15px_rgba(114,9,183,0.5)]">
                    {week.week}
                </div>

                <div className="flex-1 w-full glass-dark rounded-2xl p-6 border border-white/10 relative overflow-hidden group hover:border-secondary-500/50 transition-colors">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-secondary-500/5 to-transparent pointer-events-none"></div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-secondary-400">Week {week.week}:</span> {week.focus}
                    </h3>
                    <ul className="space-y-2">
                        {week.tasks.map((task, j) => (
                            <li key={j} className="text-gray-300 text-sm flex gap-3 items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-1.5 shrink-0"></div>
                                <span className="leading-relaxed">{task}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
           ))}
        </motion.div>
      )}
    </div>
  );
}
