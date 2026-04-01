import React, { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import { Check, Loader, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Pricing() {
    const { user, fetchUser } = useAuth();
    const [loading, setLoading] = useState(false);

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleUpgrade = async () => {
        setLoading(true);
        const res = await loadRazorpay();
        if (!res) {
            toast.error('Razorpay SDK failed to load. Check connection.');
            setLoading(false);
            return;
        }

        try {
            // 1. Create Order on Backend
            const { data } = await api.post('/payment/create-order');
            
            // 2. Configure Razorpay Options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder', // Usually fetched or injected via env
                amount: data.amount,
                currency: data.currency,
                name: 'CareerBoost AI Pro',
                description: 'Unlimited access to all AI career tools',
                order_id: data.id, 
                handler: async function (response) {
                    try {
                        const payload = {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature
                        };
                        const verifyRes = await api.post('/payment/verify', payload);
                        if (verifyRes.data.status === 'success') {
                            toast.success("Payment Successful! You are now a PRO.");
                            // Update user state
                            if(fetchUser) fetchUser(); 
                        } else {
                            toast.error("Payment Verification Failed!");
                        }
                    } catch (e) {
                         toast.error("Error verifying payment");
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                },
                theme: {
                    color: '#4361ee'
                }
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            toast.error('Error creating payment order');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-12 pt-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg">Invest in your career. Upgrade to PRO to unlock unlimited AI resume parsing, mock interviews, and advanced career tools.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                {/* Free Tier */}
                <div className="glass-dark rounded-3xl p-8 border border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-2">Free Plan</h2>
                    <p className="text-gray-400 mb-6">Perfect to get a basic check.</p>
                    <div className="mb-8">
                        <span className="text-5xl font-extrabold text-white">₹0</span>
                    </div>
                    
                    <ul className="space-y-4 mb-8">
                        {['2 Resume Analyses per month', 'Basic Resume Roast Mode', 'Dashboard Access', 'Basic Projects ideas'].map((f, i) => (
                             <li key={i} className="flex items-center gap-3 text-gray-300">
                                 <Check className="w-5 h-5 text-gray-500" /> {f}
                             </li>
                        ))}
                         {['Unlimited AI Mock Interviews', 'Career Roadmap Generator', 'Personal Branding toolkit'].map((f, i) => (
                             <li key={i} className="flex items-center gap-3 text-gray-600 opacity-50">
                                 <Check className="w-5 h-5 text-gray-700" /> {f}
                             </li>
                        ))}
                    </ul>
                    
                    <button disabled className="w-full py-4 rounded-xl bg-white/5 text-gray-400 font-bold border border-white/10 opacity-50 cursor-not-allowed">
                        {user?.plan === 'FREE' ? 'Current Plan' : 'Free'}
                    </button>
                </div>

                {/* Pro Tier */}
                <div className="glass rounded-3xl p-8 border-2 border-primary-500 relative transform md:-translate-y-4 shadow-2xl shadow-primary-500/20 bg-gradient-to-b from-primary-900/40 to-transparent flex flex-col">
                    <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                        <Star className="w-3 h-3" /> Most Popular
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Pro Plan</h2>
                    <p className="text-gray-300 mb-6">For serious job seekers.</p>
                    <div className="mb-8">
                        <span className="text-5xl font-extrabold text-white">₹999</span>
                        <span className="text-gray-400"> / lifetime</span>
                    </div>
                    
                    <ul className="space-y-4 mb-8 flex-1">
                        {['Unlimited Resume Analyses', 'Unlimited Resume Roasts', 'Voice Mock Interviews', 'Career Roadmap Generator', 'Personal Branding tool', 'Advanced Gamification / XP', 'Priority support'].map((f, i) => (
                             <li key={i} className="flex items-center gap-3 text-white">
                                 <Check className="w-5 h-5 text-primary-400 bg-primary-500/20 rounded-full p-0.5" /> {f}
                             </li>
                        ))}
                    </ul>
                    
                    <button 
                        onClick={handleUpgrade}
                        disabled={loading || user?.plan === 'PRO'}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-500 hover:to-accent-400 text-white font-bold transition-all disabled:opacity-50 mt-auto shadow-[0_0_20px_rgba(67,97,238,0.4)]"
                    >
                        {loading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : user?.plan === 'PRO' ? 'You are PRO' : 'Upgrade to PRO'}
                    </button>
                </div>
            </div>
        </div>
    );
}
