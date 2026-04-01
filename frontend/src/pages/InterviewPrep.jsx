import React, { useState } from 'react';
import api from '../api/axios';
import { Loader, Code, Shield, Cpu, Database, Cloud } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const roles = [
  { id: 'Frontend Developer', icon: Code, color: 'text-blue-400' },
  { id: 'Backend Developer', icon: Database, color: 'text-green-400' },
  { id: 'Fullstack Developer', icon: Cpu, color: 'text-purple-400' },
  { id: 'DevOps Engineer', icon: Cloud, color: 'text-cyan-400' },
  { id: 'Cybersecurity', icon: Shield, color: 'text-red-400' },
];

const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

export default function InterviewPrep() {
  const [selectedRole, setSelectedRole] = useState(roles[0].id);
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [revealed, setRevealed] = useState({});

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    setRevealed({});
    try {
      const { data } = await api.post('/ai/interview', { role: selectedRole, difficulty });
      setResult(data); // Expecting array: [{question, answer}]
      toast.success('Generated interview questions!');
    } catch (error) {
      toast.error('Failed to generate questions');
    } finally {
      setLoading(false);
    }
  };

  const toggleReveal = (index) => {
    setRevealed(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">AI Interview Prep</h1>
        <p className="text-gray-400 mt-2">Generate realistic technical interview questions tailored to your target role and skill level.</p>
      </div>

      <div className="glass-panel shadow-lg rounded-2xl p-6 mb-8 border border-white/5">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Target Role</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {roles.map((r) => {
            const isSelected = selectedRole === r.id;
            return (
              <button key={r.id} onClick={() => setSelectedRole(r.id)} 
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${isSelected ? 'glass border-primary-500 bg-primary-500/10' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}>
                <r.icon className={`w-6 h-6 ${r.color}`} />
                <span className="text-xs font-medium text-center">{r.id}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Difficulty Level</h3>
                <div className="flex flex-wrap gap-3">
                {difficulties.map((d) => (
                    <button key={d} onClick={() => setDifficulty(d)}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${difficulty === d ? 'bg-accent-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                    {d}
                    </button>
                ))}
                </div>
            </div>
            <button onClick={handleGenerate} disabled={loading} className="w-full md:w-auto h-11 px-8 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <Loader className="w-5 h-5 animate-spin" /> : 'Generate Questions'}
            </button>
        </div>
      </div>

      {result && Array.isArray(result) && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h2 className="text-xl font-bold mb-4">{selectedRole} - {difficulty} Level</h2>
          {result.map((item, i) => (
            <div key={i} className="glass-panel shadow-lg rounded-xl p-6 border border-white/10">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary-500/20 text-primary-400 flex items-center justify-center font-bold shrink-0">{i + 1}</div>
                <div className="flex-1">
                    <p className="text-lg font-medium text-white mb-3">{item.question}</p>
                    {revealed[i] ? (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4 border-t border-white/10 text-gray-300">
                            <span className="text-xs font-bold text-green-400 tracking-wider uppercase block mb-2">Ideal Answer</span>
                            {item.answer}
                        </motion.div>
                    ) : (
                        <button onClick={() => toggleReveal(i)} className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                            Reveal AI Answer
                        </button>
                    )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
