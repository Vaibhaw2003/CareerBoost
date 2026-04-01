import React, { useState } from 'react';
import api from '../api/axios';
import { Flame, Loader, Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ResumeRoast() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await api.post('/resume/roast', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(data);
      toast.success('Prepare to be roasted!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to analyze resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-orange-500/10 rounded-full mb-4">
            <Flame className="w-12 h-12 text-orange-500 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold text-orange-500">Resume Roast Mode</h1>
        <p className="text-gray-400 mt-2 text-lg">Upload your resume. Warning: It will be brutal, but funny.</p>
      </div>

      {!result && (
        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="glass-dark rounded-2xl p-8 border border-orange-500/30 max-w-lg mx-auto text-center">
          <input type="file" id="roast" className="hidden" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="roast" className="cursor-pointer block bg-white/5 border border-orange-500/20 hover:bg-orange-500/10 hover:border-orange-500 p-6 rounded-xl transition-all mb-6">
            {file ? <span className="text-orange-400 font-medium">{file.name}</span> : 'Select PDF File'}
          </label>
          <button onClick={handleUpload} disabled={loading || !file} className="w-full py-3 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 transition-all disabled:opacity-50">
            {loading ? <Loader className="animate-spin h-5 w-5 mx-auto" /> : 'Roast Me Alive'}
          </button>
        </motion.div>
      )}

      {result && (
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-dark border border-orange-500/50 rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-[50px]"></div>
            <h2 className="text-2xl font-bold mb-6 text-white">The Judgement</h2>
            
            <div className="space-y-6 text-left">
                <div className="bg-black/40 p-4 rounded-xl border border-red-500/20">
                    <h3 className="text-orange-400 font-bold mb-2 uppercase text-xs tracking-wider">The Brutal Truth</h3>
                    <ul className="space-y-2">
                        {result.weaknesses.map((w,i)=><li key={i} className="text-gray-300">🔥 {w}</li>)}
                    </ul>
                </div>

                <div className="bg-black/40 p-4 rounded-xl border border-orange-500/20">
                    <h3 className="text-orange-400 font-bold mb-2 uppercase text-xs tracking-wider">Sarcastic Suggestions</h3>
                    <ul className="space-y-2">
                        {result.suggestions.map((s,i)=><li key={i} className="text-gray-300">💡 {s}</li>)}
                    </ul>
                </div>

                <div className="flex justify-center items-center gap-4 pt-4 border-t border-white/10">
                    <div className="text-center">
                        <span className="block text-4xl font-bold text-orange-500">{result.score}/100</span>
                        <span className="text-xs text-gray-400 uppercase">Survival Score</span>
                    </div>
                    <button className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all">
                        <Share2 className="w-4 h-4" /> Share
                    </button>
                    <button onClick={() => setResult(null)} className="flex items-center gap-2 bg-orange-600 px-4 py-2 rounded-lg hover:bg-orange-500 transition-all text-white font-medium">
                        Try Again
                    </button>
                </div>
            </div>
        </motion.div>
      )}
    </div>
  );
}
