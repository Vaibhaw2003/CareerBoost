import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Users, CreditCard, DollarSign, Activity } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        api.get('/admin/stats').then(res => setStats(res.data)).catch(console.error);
        api.get('/admin/users').then(res => setUsers(res.data)).catch(console.error);
        api.get('/admin/payments').then(res => setPayments(res.data)).catch(console.error);
    }, []);

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <h1 className="text-3xl font-bold text-white mb-8">Admin Control Panel</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="glass-dark p-6 rounded-2xl border border-blue-500/30">
                    <div className="flex items-center gap-4 mb-2">
                        <Users className="w-6 h-6 text-blue-400" />
                        <h3 className="text-sm font-medium text-gray-400 uppercase">Total Users</h3>
                    </div>
                    <p className="text-3xl font-bold text-white">{stats?.totalUsers || 0}</p>
                </div>
                <div className="glass-dark p-6 rounded-2xl border border-green-500/30">
                    <div className="flex items-center gap-4 mb-2">
                        <DollarSign className="w-6 h-6 text-green-400" />
                        <h3 className="text-sm font-medium text-gray-400 uppercase">Total Revenue</h3>
                    </div>
                    <p className="text-3xl font-bold text-white">₹{stats?.totalRevenue || 0}</p>
                </div>
                <div className="glass-dark p-6 rounded-2xl border border-purple-500/30">
                    <div className="flex items-center gap-4 mb-2">
                        <CreditCard className="w-6 h-6 text-purple-400" />
                        <h3 className="text-sm font-medium text-gray-400 uppercase">Payments</h3>
                    </div>
                    <p className="text-3xl font-bold text-white">{stats?.totalPayments || 0}</p>
                </div>
                <div className="glass-dark p-6 rounded-2xl border border-rose-500/30">
                    <div className="flex items-center gap-4 mb-2">
                        <Activity className="w-6 h-6 text-rose-400" />
                        <h3 className="text-sm font-medium text-gray-400 uppercase">System Status</h3>
                    </div>
                    <p className="text-3xl font-bold text-green-400">Online</p>
                </div>
            </div>

            <div className="glass border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5">
                    <h3 className="text-xl font-bold text-white">Recent Users</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-white/5 text-gray-300 uppercase">
                            <tr>
                                <th className="px-6 py-4 font-medium">Name</th>
                                <th className="px-6 py-4 font-medium">Email</th>
                                <th className="px-6 py-4 font-medium">Plan</th>
                                <th className="px-6 py-4 font-medium">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id} className="border-b border-white/5 hover:bg-white/5">
                                    <td className="px-6 py-4 font-medium text-white">{u.name}</td>
                                    <td className="px-6 py-4">{u.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${u.plan === 'PRO' ? 'bg-primary-500/20 text-primary-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                            {u.plan}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{u.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
