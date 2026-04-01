import React, { useState } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { Mic, MicOff, PlayCircle, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function VoiceMockInterview() {
    const { transcript, isListening, supported, startListening, stopListening, setTranscript } = useSpeechRecognition();
    const [question, setQuestion] = useState("Tell me about a time you had to resolve a conflict within your team.");
    const [evaluating, setEvaluating] = useState(false);
    const [evaluation, setEvaluation] = useState(null);

    const handleEvaluation = () => {
        if(!transcript) return toast.error("Please record an answer first.");
        setEvaluating(true);
        // Simulate API call to OpenAIService evaluation endpoint
        setTimeout(() => {
            setEvaluation("Your answer correctly applied the STAR method. You highlighted the specific conflict, described your structured approach to resolving it through communication, and shared a positive result. To improve, try mentioning any long-term changes made to team processes as a result.");
            setEvaluating(false);
            toast.success("Answer Evaluated!");
        }, 2000);
    };

    if (!supported) {
        return <div className="p-8 text-center text-red-400">Your browser doesn't support the Web Speech API. Please try Google Chrome.</div>;
    }

    const speakQuestion = () => {
        if('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(question);
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Mic className="w-8 h-8 text-primary-500" /> Voice Mock Interview
                </h1>
                <p className="text-gray-400 mt-2">Practice answering behavioral questions with your voice and get instant AI feedback.</p>
            </div>

            <div className="glass-dark rounded-2xl p-8 mb-8 border border-primary-500/30 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-500/5 pulse-animation pointer-events-none" />
                
                <h3 className="text-sm font-bold text-primary-400 uppercase tracking-wider mb-4">Question</h3>
                <p className="text-2xl text-white font-medium mb-6">{question}</p>
                <button onClick={speakQuestion} className="bg-white/5 hover:bg-white/10 text-white rounded-full p-3 transition-colors inline-flex">
                    <PlayCircle className="w-6 h-6" />
                </button>
            </div>

            <div className="glass p-8 rounded-2xl border-white/5 flex flex-col items-center justify-center min-h-[300px]">
                <button 
                    onClick={isListening ? stopListening : startListening}
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl mb-6 ${
                        isListening ? 'bg-red-500 animate-pulse' : 'bg-primary-600 hover:bg-primary-500'
                    }`}
                >
                    {isListening ? <MicOff className="w-10 h-10 text-white" /> : <Mic className="w-10 h-10 text-white" />}
                </button>
                <p className="text-gray-400 mb-6">{isListening ? 'Recording... Stop when you are done.' : 'Click to start answering'}</p>

                {transcript && (
                    <div className="w-full text-left bg-black/40 p-6 rounded-xl border border-white/10 mb-6 max-h-[200px] overflow-y-auto">
                        <p className="text-gray-300 italic">"{transcript}"</p>
                    </div>
                )}

                {transcript && !isListening && !evaluating && !evaluation && (
                    <button onClick={handleEvaluation} className="bg-primary-600 px-8 py-3 rounded-xl text-white font-medium hover:bg-primary-500 transition-colors">
                        Evaluate My Answer
                    </button>
                )}

                {evaluating && (
                    <div className="flex items-center gap-2 text-primary-400 font-medium">
                        <Loader className="w-5 h-5 animate-spin" /> AI is evaluating your response...
                    </div>
                )}
            </div>

            {evaluation && (
                 <div className="mt-8 glass-dark p-8 rounded-2xl border border-green-500/30">
                     <h3 className="text-lg font-bold text-green-400 mb-3">AI Evaluation</h3>
                     <p className="text-gray-300 leading-relaxed">{evaluation}</p>
                     
                     <div className="mt-6 flex justify-end">
                         <button onClick={() => { setTranscript(''); setEvaluation(null); }} className="text-primary-400 text-sm hover:underline">
                             Try another question
                         </button>
                     </div>
                 </div>
            )}
        </div>
    );
}
