import React, { useState } from 'react';
import api from '../api/axios';
import { Loader, UserCircle, MessageSquare, Briefcase, Copy, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const types = [
    { id: 'LinkedIn Post', icon: MessageSquare },
    { id: 'Portfolio Bio', icon: UserCircle },
    { id: 'Resume Summary', icon: Briefcase }
];

export default function PersonalBranding() {
  const [type, setType] = useState('LinkedIn Post');
  const [userDetails, setUserDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if(!userDetails) return;
    setLoading(true);
    setResult(null);
    setCopied(false);
    try {
      const { data } = await api.post('/ai/branding', { type, userDetails });
      setResult(data); 
      toast.success('Generated successfully!');
    } catch (error) {
      toast.error('Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
      if(!result?.content) return;
      navigator.clipboard.writeText(result.content);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-3">
             <UserCircle className="w-8 h-8 text-pink-500" /> Personal Branding
        </h1>
        <p className="text-gray-400 mt-2">Generate engaging LinkedIn posts, compelling portfolio bios, and professional resume summaries.</p>
      </div>

      <div className="glass-dark rounded-2xl p-6 md:p-8 mb-8 border border-white/5">
         
         <div className="flex flex-wrap gap-4 mb-8">
             {types.map(t => (
                 <button key={t.id} onClick={() => setType(t.id)} className={`px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${type === t.id ? 'bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)]' : 'bg-white/5 hover:bg-white/10 text-gray-400'}`}>
                     <t.icon className="w-4 h-4" /> {t.id}
                 </button>
             ))}
         </div>

         <div className="mb-6">
            <label className="text-sm font-medium text-gray-400 mb-2 block">Tell us about yourself or the topic</label>
            <textarea 
                className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all min-h-[120px] resize-y" 
                placeholder={type === 'LinkedIn Post' ? "E.g., I just completed my first full-stack React and Node.js project. It's a task manager app..." : "E.g., I'm a self-taught frontend developer looking for my first role, passionate about UI/UX and React..."}
                value={userDetails} 
                onChange={(e) => setUserDetails(e.target.value)} 
            />
         </div>
         
         <div className="flex justify-end">
             <button onClick={handleGenerate} disabled={loading} className="h-12 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <Loader className="w-5 h-5 animate-spin" /> : `Generate ${type}`}
             </button>
         </div>
      </div>

      {result && result.content && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass rounded-2xl border flex flex-col overflow-hidden relative">
             <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-b border-white/5">
                 <h3 className="font-bold text-white flex items-center gap-2">Output</h3>
                 <button onClick={handleCopy} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                     {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                     {copied ? 'Copied' : 'Copy Text'}
                 </button>
             </div>
             <div className="p-6 md:p-8 whitespace-pre-wrap text-gray-300 leading-relaxed font-medium">
                 {result.content}
             </div>
          </motion.div>
      )}
    </div>
  );
}
