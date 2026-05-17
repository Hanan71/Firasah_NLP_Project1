/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

import { 
  Send, 
  MessageSquare, 
  Smile, 
  Frown, 
  Meh, 
  Copy, 
  Check, 
  RefreshCw, 
  AlertCircle,
  Sparkles,
  Search,
  Quote,
  Heart
} from 'lucide-react';

interface AnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  label: string;
  score: number;
  suggestions: string[];
}

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Mouse Glow Effect Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleAnalyze = useCallback(async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Use Gemini AI Service
      const { analyzeSentiment } = await import('../services/aiService');
      const data = await analyzeSentiment(text);
      
      setResult({
        sentiment: data.sentiment,
        label: data.label,
        score: data.score || 1.0,
        suggestions: data.suggestions || [
          "شكراً لمشاركتك رأيك معنا!",
          "نقدر تواصلك اللطيف.",
          "فريقنا يهتم جداً بملاحظاتك."
        ]
      });
    } catch (err) {
      console.error("Analysis Error:", err);
      setError('عذراً، حدث خطأ أثناء الاتصال بـ Gemini لتحليل النص.');
    } finally {
      setIsLoading(false);
    }
  }, [text]);

  const handleCopy = useCallback((suggestion: string, index: number) => {
    navigator.clipboard.writeText(suggestion);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  const handleTryExample = useCallback(() => {
    const examples = [
      "أنا سعيد جداً بالخدمة الرائعة التي تلقيتها اليوم، شكراً لكم!",
      "للأسف تجربة سيئة جداً، المنتج لم يصل في الموعد والجودة ضعيفة.",
      "سأقوم بمراجعة العقد غداً وإرسال الملاحظات المطلوبة لاحقاً.",
    ];
    setText(examples[Math.floor(Math.random() * examples.length)]);
  }, []);

  const sentimentIcon = useMemo(() => {
    if (!result) return null;
    switch (result.sentiment) {
      case 'positive': return <Smile className="w-12 h-12 text-emerald-500" />;
      case 'negative': return <Frown className="w-12 h-12 text-rose-500" />;
      case 'neutral': return <Meh className="w-12 h-12 text-sky-500" />;
    }
  }, [result]);

  const sentimentColorClass = useMemo(() => {
    if (!result) return '';
    switch (result.sentiment) {
      case 'positive': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'negative': return 'text-rose-600 bg-rose-50 border-rose-200';
      case 'neutral': return 'text-sky-600 bg-sky-50 border-sky-200';
    }
  }, [result]);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center selection:bg-sky-500 selection:text-white tracking-tight overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div style={{ x: springX, y: springY }} className="absolute w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-[100px] z-0" />
      </div>

      <motion.section initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }} className="relative z-10 w-full max-w-6xl min-h-[50vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-8">
        <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} className="flex flex-col items-center gap-6 mb-12">
          <div className="relative">
            <div className="relative w-24 h-24 bg-white rounded-[2rem] border border-slate-100 flex items-center justify-center shadow-xl shadow-sky-100"><Sparkles className="w-12 h-12 text-sky-500" /></div>
          </div>
          <span className="text-2xl font-black text-slate-800">فِراسـة لتحليل المشاعر</span>
        </motion.div>
        <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">نستخدم أحدث تقنيات الذكاء الاصطناعي لفك شيفرات النصوص العربية بلمسة إبداعية.</p>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button onClick={() => document.getElementById('analysis-tool')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg shadow-xl hover:bg-sky-600 transition-all flex items-center gap-3">ابدأ تجربتك الآن <Send className="w-5 h-5 rotate-180" /></button>
          <Link to="/about" className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center gap-2">تعرف على المشروع <Heart className="w-5 h-5 text-rose-400" /></Link>
        </div>
      </motion.section>

      <main id="analysis-tool" className="relative z-10 w-full max-w-4xl px-4 py-12 space-y-8">
        <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-3xl rounded-3xl p-6 md:p-10 border border-white shadow-xl shadow-sky-100/50">
          <div className="flex justify-between items-end mb-6">
            <label className="text-sm font-bold text-slate-400 flex items-center gap-2 uppercase tracking-wider"><MessageSquare className="w-5 h-5 text-sky-500" />مختبر النصوص الذكي</label>
            <button onClick={handleTryExample} className="px-5 py-2.5 bg-sky-50 hover:bg-sky-100 rounded-full border border-sky-100 text-sm font-bold text-sky-600 flex items-center gap-2 transition-colors"><RefreshCw className="w-4 h-4" />تجربة مثال</button>
          </div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="اكتب هنا وسأحلل المشاعر لك..." className="w-full min-h-[160px] p-6 bg-slate-50/50 rounded-2xl border border-slate-200 focus:bg-white focus:border-sky-400 transition-all text-lg resize-none outline-none leading-relaxed text-slate-800" maxLength={500} />
          <div className="mt-8 flex justify-center">
            <button onClick={handleAnalyze} disabled={isLoading || !text.trim()} className="px-10 py-4 bg-sky-500 text-white rounded-full font-bold text-xl shadow-lg hover:bg-sky-600 disabled:opacity-50 transition-all flex items-center gap-3">
              {isLoading ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
              <span>{isLoading ? 'جاري التحليل...' : 'حلل المشاعر'}</span>
            </button>
          </div>
        </motion.section>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-2xl flex items-center gap-3 text-sm">
              <AlertCircle className="w-5 h-5" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && !isLoading && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl flex flex-col md:flex-row items-center gap-8">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">{sentimentIcon}</div>
                <div className="flex-1 text-center md:text-right">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                    <h2 className="text-2xl font-bold text-slate-800">النتيجة النهائية</h2>
                    <span className={`px-6 py-2 rounded-full text-lg font-bold border ${sentimentColorClass}`}>{result.label}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mt-3">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${result.score * 100}%` }} className={`h-full ${result.sentiment === 'positive' ? 'bg-emerald-400' : result.sentiment === 'negative' ? 'bg-rose-400' : 'bg-sky-400'}`} />
                  </div>
                </div>
              </section>

              <section className="space-y-8 px-2">
                <h3 className="text-xl font-bold text-slate-800 text-center">اقتراحات ذكية للرد</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {result.suggestions.map((suggestion, index) => (
                    <motion.div key={index} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-sky-400 shadow-md cursor-pointer relative overflow-hidden transition-all" onClick={() => handleCopy(suggestion, index)}>
                      <Quote className="w-6 h-6 text-sky-100 mb-4" />
                      <p className="text-lg text-slate-700 font-medium italic leading-relaxed">{suggestion}</p>
                      {copiedIndex === index && <Check className="absolute top-4 left-4 w-5 h-5 text-emerald-500" />}
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="pt-24 space-y-16"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="text-center">
            <h2 className="text-4xl font-black mb-6 text-slate-900 uppercase">لماذا تختار فِراسـة</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg font-normal leading-relaxed">نكسر حدود المستحيل في فهم اللغة العربية، لنمنحك تجربة لا تُنسى في كل كلمة بتصميم مريح ومبدع.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "ذكاء عالي", desc: "تحليل عميق يعتمد على أقوى الموديلات اللغوية في العالم حالياً بكل سلاسة.", icon: <Sparkles className="w-8 h-8 text-sky-500" />, bg: "bg-sky-50" },
              { title: "سرعة البرق", desc: "واجهة مستخدم تسابق الزمن في سرعتها وردود أفعالها الذكية والمبدعة.", icon: <MessageSquare className="w-8 h-8 text-emerald-500" />, bg: "bg-emerald-50" },
              { title: "فخر لغوي", desc: "تم تطويره ليكون المرجع الأول في تحليل سياقات العرب ولهجاتهم المتنوعة.", icon: <Quote className="w-8 h-8 text-rose-500" />, bg: "bg-rose-50" }
            ].map((feature, i) => (
              <motion.div key={i} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring" } } }} whileHover={{ y: -10 }} className="group relative p-8 rounded-3xl bg-white border border-slate-200 shadow-lg shadow-slate-100 transition-all duration-300">
                <div className={`mb-6 w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}>{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-base">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <footer className="relative z-10 w-full bg-slate-900 text-white mt-16 py-12 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
          <h4 className="text-2xl font-bold mb-4 tracking-tighter">فِراسـة لتحليل المشاعر</h4>
          <div className="flex flex-wrap gap-6 mb-8 text-sm font-semibold uppercase tracking-wider border-t border-white/10 pt-6 w-full justify-center">
            <Link to="/about" className="text-slate-400 hover:text-sky-400 transition-colors">عن المشروع</Link>
            <Link to="/faq" className="text-slate-400 hover:text-sky-400 transition-colors">الأسئلة الشائعة</Link>
            <Link to="/how-it-works" className="text-slate-400 hover:text-sky-400 transition-colors">كيف يعمل؟</Link>
            <Link to="/methodology" className="text-slate-400 hover:text-sky-400 transition-colors">المنهجية</Link>
          </div>
          <p className="text-slate-500 text-xs tracking-wider uppercase leading-loose">طالبات جامعة شقراء. نصنع المستقبل، كلمة بكلمة. © 2026</p>
        </div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      </footer>
    </div>
  );
}