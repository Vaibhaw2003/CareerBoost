import React, { useState } from 'react';
import api from '../api/axios';
import { UploadCloud, FileText, CheckCircle, AlertTriangle, Loader, TrendingUp } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await api.post('/resume/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(data);
      toast.success('Analysis complete!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to analyze resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">AI Resume Analyzer</h1>
        <p className="text-gray-400 mt-2">Upload your PDF resume to get an instant professional review and score.</p>
      </div>

      {!result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel shadow-lg rounded-2xl p-12 text-center border border-white/10 border-dashed max-w-2xl mx-auto">
          <UploadCloud className="w-16 h-16 text-primary-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">Upload your Resume</h3>
          <p className="text-gray-400 text-sm mb-6">PDF format only, up to 5MB</p>
          
          <input type="file" id="resume" className="hidden" accept=".pdf" onChange={handleFileChange} />
          <label htmlFor="resume" className="cursor-pointer inline-block bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-3 rounded-xl transition-all">
            {file ? file.name : 'Select File'}
          </label>

          {file && (
            <div className="mt-6">
              <button onClick={handleUpload} disabled={loading} className="w-full max-w-xs mx-auto flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-500 transition-all disabled:opacity-50">
                {loading ? <Loader className="animate-spin h-5 w-5" /> : 'Analyze Now'}
              </button>
            </div>
          )}
        </motion.div>
      )}

      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <button onClick={() => setResult(null)} className="text-sm text-primary-400 hover:text-primary-300">← Analyze another resume</button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel shadow-lg p-6 rounded-2xl flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium text-gray-300 mb-2">Overall Score</h3>
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8" style={{borderColor: result.score > 70 ? '#4cc9f0' : '#f59e0b'}}>
                <span className="text-4xl font-bold">{result.score}</span>
              </div>
            </div>

            <div className="glass-panel shadow-lg p-6 rounded-2xl flex flex-col items-center justify-center md:col-span-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp className="w-24 h-24" /></div>
                <h3 className="text-lg font-medium text-gray-300 mb-2 z-10">Hiring Probability</h3>
                <div className="text-5xl font-bold bg-gradient-to-r from-accent-400 to-primary-500 bg-clip-text text-transparent z-10 mb-4">{result.hiringProbability}%</div>
                <div className="w-full bg-gray-700 rounded-full h-2.5 z-10"><div className="bg-gradient-to-r from-accent-400 to-primary-500 h-2.5 rounded-full" style={{ width: `${result.hiringProbability}%` }}></div></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel shadow-lg p-6 rounded-2xl">
              <h3 className="text-lg font-medium text-green-400 flex items-center gap-2 mb-4"><CheckCircle className="w-5 h-5"/> Strengths</h3>
              <ul className="space-y-3">
                {result.strengths.map((s, i) => <li key={i} className="text-gray-300 text-sm flex gap-2"><span className="text-green-400 shrink-0">✦</span><span>{s}</span></li>)}
              </ul>
            </div>
            <div className="glass-panel shadow-lg p-6 rounded-2xl">
              <h3 className="text-lg font-medium text-red-400 flex items-center gap-2 mb-4"><AlertTriangle className="w-5 h-5"/> Weaknesses</h3>
              <ul className="space-y-3">
                {result.weaknesses.map((w, i) => <li key={i} className="text-gray-300 text-sm flex gap-2"><span className="text-red-400 shrink-0">✕</span><span>{w}</span></li>)}
              </ul>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border-primary-500/30">
            <h3 className="text-lg font-medium text-primary-400 flex items-center gap-2 mb-4"><FileText className="w-5 h-5"/> Improvement Suggestions</h3>
            <ul className="space-y-3">
               {result.suggestions.map((s, i) => <li key={i} className="text-gray-300 text-sm flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0 mt-1.5"></div><span>{s}</span></li>)}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}
