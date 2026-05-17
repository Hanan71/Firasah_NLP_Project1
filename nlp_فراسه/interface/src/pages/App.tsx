import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Home from './Home'; 

// --- مكون المقدمة (SplashScreen) ---
const SplashScreen = () => (
  <motion.div
    key="splash-bg"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.8 }}
    className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center text-white"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center"
    >
      <div className="relative mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 border-t-2 border-sky-500 rounded-full opacity-40"
        />
        <div className="w-24 h-24 bg-sky-500 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-sky-500/20">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
      </div>
      <h2 className="text-3xl font-black tracking-tighter mb-2">فِراسـة </h2>
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
        <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse delay-75" />
        <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse delay-150" />
      </div>
    </motion.div>
  </motion.div>
);

// --- المكون الرئيسي App المحدث ---
export default function App() {
  // التعديل هنا: نتحقق إذا كان المستخدم قد رأى المقدمة في هذه الجلسة أم لا
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem('hasSeenSplash');
  });

  useEffect(() => {
    // إذا لم يرها بعد، انتظر 3 ثوانٍ ثم سجل أنه رآها
    if (!sessionStorage.getItem('hasSeenSplash')) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('hasSeenSplash', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      // إذا رآها سابقاً، اجعل التحميل فورياً
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <SplashScreen key="splash" />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Home /> 
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}