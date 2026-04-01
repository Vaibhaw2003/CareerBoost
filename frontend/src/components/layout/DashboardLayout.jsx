import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
  return (
    <div className="bg-dark-950 min-h-screen flex relative overflow-hidden text-white font-sans">
      {/* Background radial gradients for dynamic feel */}
      <div className="fixed top-[-25%] left-[-15%] w-[60%] h-[60%] rounded-full bg-primary-600/10 blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-25%] right-[-15%] w-[60%] h-[60%] rounded-full bg-secondary-600/10 blur-[140px] pointer-events-none" />
      <div className="fixed top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-accent-500/5 blur-[120px] pointer-events-none" />

      <Sidebar />
      
      <main className="flex-1 ml-64 min-h-screen relative z-10 p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-full max-w-7xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
