import React, { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import { Check, Loader, Star, Zap, Crown, X, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function Pricing() {
    const { user, fetchUser } = useAuth();
    const [loading, setLoading] = useState(null);
    const [billingCycle, setBillingCycle] = useState('lifetime');

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleUpgrade = async (planName, amount) => {
        setLoading(planName);
        const res = await loadRazorpay();
        if (!res) {
            toast.error('Razorpay SDK failed to load. Check connection.');
            setLoading(null);
            return;
        }

        try {
            const { data } = await api.post('/payment/create-order', { plan: planName, amount });
            
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
                amount: data.amount,
                currency: data.currency,
                name: `CareerBoost AI ${planName}`,
                description: `Upgrade to ${planName} plan`,
                order_id: data.id,
                handler: async function (response) {
                    try {
                        const payload = {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            plan: planName
                        };
                        const verifyRes = await api.post('/payment/verify', payload);
                        if (verifyRes.data.status === 'success') {
                            toast.success(`Payment Successful! You are now on ${planName} plan.`);
                            if (fetchUser) fetchUser();
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
            setLoading(null);
        }
    };

    const plans = [
        {
            name: 'Free',
            planKey: 'FREE',
            price: 0,
            period: '',
            description: 'Get started with basic features to explore the platform.',
            icon: Zap,
            color: 'gray',
            borderColor: 'border-white/10',
            bgGlow: '',
            buttonStyle: 'bg-white/5 text-gray-400 border border-white/10 opacity-50 cursor-not-allowed',
            buttonText: user?.plan === 'FREE' ? 'Current Plan' : 'Free Plan',
            disabled: true,
            featured: false,
            features: [
                { text: '2 Resume Analyses per month', included: true },
                { text: 'Basic Resume Roast Mode', included: true },
                { text: 'Dashboard Access', included: true },
                { text: 'Basic Project Ideas', included: true },
                { text: 'AI Mock Interviews', included: false },
                { text: 'Career Roadmap Generator', included: false },
                { text: 'Personal Branding Toolkit', included: false },
                { text: 'Priority Support', included: false },
            ]
        },
        {
            name: 'Starter',
            planKey: 'STARTER',
            price: 299,
            period: '/ month',
            description: 'Perfect for students and freshers starting their career journey.',
            icon: Star,
            color: 'accent',
            borderColor: 'border-accent-500/40',
            bgGlow: 'shadow-lg shadow-accent-500/10',
            buttonStyle: 'bg-gradient-to-r from-accent-500 to-accent-400 hover:from-accent-400 hover:to-accent-500 text-white shadow-[0_0_20px_rgba(0,180,216,0.3)]',
            buttonText: loading === 'STARTER' ? null : user?.plan === 'STARTER' ? 'Current Plan' : 'Get Starter',
            disabled: user?.plan === 'STARTER' || user?.plan === 'PRO',
            featured: false,
            features: [
                { text: '15 Resume Analyses per month', included: true },
                { text: 'Unlimited Resume Roasts', included: true },
                { text: 'Dashboard + Analytics', included: true },
                { text: 'AI Project Ideas Generator', included: true },
                { text: '5 AI Mock Interviews / month', included: true },
                { text: 'Basic Career Roadmap', included: true },
                { text: 'Personal Branding Toolkit', included: false },
                { text: 'Priority Support', included: false },
            ]
        },
        {
            name: 'Pro',
            planKey: 'PRO',
            price: 599,
            period: '/ lifetime',
            description: 'For serious job seekers who want every advantage possible.',
            icon: Crown,
            color: 'primary',
            borderColor: 'border-primary-500',
            bgGlow: 'shadow-2xl shadow-primary-500/20',
            buttonStyle: 'bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-500 hover:to-secondary-400 text-white shadow-[0_0_30px_rgba(67,97,238,0.4)]',
            buttonText: loading === 'PRO' ? null : user?.plan === 'PRO' ? 'You are PRO ✨' : 'Upgrade to PRO',
            disabled: user?.plan === 'PRO',
            featured: true,
            features: [
                { text: 'Unlimited Resume Analyses', included: true },
                { text: 'Unlimited Resume Roasts', included: true },
                { text: 'Full Dashboard + Advanced Analytics', included: true },
                { text: 'AI Project Builder with Code', included: true },
                { text: 'Unlimited AI Mock Interviews', included: true },
                { text: 'Advanced Career Roadmap Generator', included: true },
                { text: 'Personal Branding Toolkit', included: true },
                { text: 'Priority Support + Early Access', included: true },
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
    };

    return (
        <div className="max-w-7xl mx-auto pb-16 pt-8 px-4">
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-300 font-semibold text-sm mb-6">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    Simple, Transparent Pricing
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                    Choose Your <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Career Plan</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Invest in your career growth. Pick the plan that fits your goals and unlock powerful AI tools to land your dream job.
                </p>
            </motion.div>

            {/* Plans Grid */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left items-start"
            >
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.name}
                        variants={cardVariants}
                        whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        className={`relative rounded-3xl p-8 border-2 ${plan.borderColor} ${plan.bgGlow} transition-all duration-300 flex flex-col ${
                            plan.featured 
                                ? 'bg-gradient-to-b from-primary-900/40 via-dark-800/80 to-dark-900/90 md:-translate-y-4' 
                                : 'glass-panel'
                        }`}
                    >
                        {/* Featured Badge */}
                        {plan.featured && (
                            <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-primary-500/30">
                                <Crown className="w-3.5 h-3.5" /> Most Popular
                            </div>
                        )}

                        {/* Plan Header */}
                        <div className="mb-6">
                            <div className={`w-12 h-12 rounded-2xl ${
                                plan.color === 'gray' ? 'bg-white/5' : 
                                plan.color === 'accent' ? 'bg-accent-500/15' : 
                                'bg-primary-500/15'
                            } flex items-center justify-center mb-4`}>
                                <plan.icon className={`w-6 h-6 ${
                                    plan.color === 'gray' ? 'text-gray-400' : 
                                    plan.color === 'accent' ? 'text-accent-400' : 
                                    'text-primary-400'
                                }`} />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-1">{plan.name} Plan</h2>
                            <p className="text-gray-400 text-sm">{plan.description}</p>
                        </div>

                        {/* Price */}
                        <div className="mb-8">
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-black text-white">₹{plan.price}</span>
                                {plan.period && (
                                    <span className="text-gray-400 text-sm font-medium">{plan.period}</span>
                                )}
                            </div>
                            {plan.price === 599 && (
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="text-gray-500 line-through text-sm">₹999</span>
                                    <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">SAVE 40%</span>
                                </div>
                            )}
                            {plan.price === 299 && (
                                <div className="mt-2">
                                    <span className="text-xs font-bold text-accent-400 bg-accent-400/10 px-2 py-0.5 rounded-full">BEST FOR BEGINNERS</span>
                                </div>
                            )}
                        </div>

                        {/* Features */}
                        <ul className="space-y-3.5 mb-8 flex-1">
                            {plan.features.map((feature, i) => (
                                <li key={i} className={`flex items-start gap-3 text-sm ${feature.included ? 'text-gray-200' : 'text-gray-600'}`}>
                                    {feature.included ? (
                                        <Check className={`w-5 h-5 shrink-0 mt-0.5 ${
                                            plan.color === 'gray' ? 'text-gray-400' : 
                                            plan.color === 'accent' ? 'text-accent-400' : 
                                            'text-primary-400'
                                        } bg-white/5 rounded-full p-0.5`} />
                                    ) : (
                                        <X className="w-5 h-5 shrink-0 mt-0.5 text-gray-700" />
                                    )}
                                    {feature.text}
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <button
                            onClick={() => !plan.disabled && handleUpgrade(plan.planKey, plan.price)}
                            disabled={plan.disabled || loading === plan.planKey}
                            className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 ${plan.buttonStyle} ${
                                !plan.disabled && !loading ? 'hover:scale-[1.02] active:scale-[0.98]' : ''
                            } disabled:opacity-50`}
                        >
                            {loading === plan.planKey ? (
                                <Loader className="w-5 h-5 animate-spin mx-auto" />
                            ) : (
                                plan.buttonText
                            )}
                        </button>
                    </motion.div>
                ))}
            </motion.div>

            {/* Trust Bar */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-16 text-center"
            >
                <div className="glass-panel rounded-2xl p-6 max-w-3xl mx-auto border border-white/5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-2xl">🔒</span>
                            <span className="text-gray-300 font-medium">Secure Payment via Razorpay</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-2xl">💰</span>
                            <span className="text-gray-300 font-medium">7-Day Money Back Guarantee</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-2xl">⚡</span>
                            <span className="text-gray-300 font-medium">Instant Access After Payment</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* FAQ hint */}
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center text-gray-500 text-sm mt-8"
            >
                Have questions? Reach out to us at <span className="text-primary-400">support@careerboost.ai</span>
            </motion.p>
        </div>
    );
}
