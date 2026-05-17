import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings, Cpu, BarChart3, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      title: "معالجة النص (Preprocessing)",
      desc: "تبدأ العملية بتنظيف النص العربي، إزالة الرموز الزائدة، والتعامل مع الكلمات المفتاحية وسياقها اللغوي.",
      icon: <Settings className="w-8 h-8 text-sky-500" />
    },
    {
      title: "محرك الذكاء الاصطناعي (AI Engine)",
      desc: "يعتمد النظام على خوارزميات تعلم الآلة وموديلات لغوية مدربة (مثل BERT أو خوارزميات التصنيف) لتحليل نبرة الكلام.",
      icon: <Cpu className="w-8 h-8 text-purple-500" />
    },
    {
      title: "استخراج النتائج (Classification)",
      desc: "يتم تصنيف النص إلى (إيجابي، سلبي، محايد) بناءً على درجات الثقة المستخرجة من المحلل الذكي.",
      icon: <BarChart3 className="w-8 h-8 text-emerald-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-white p-8" dir="rtl">
      <div className="max-w-4xl mx-auto pt-20">
        <h1 className="text-4xl font-black text-slate-900 mb-6 flex items-center gap-3">
          كيف يعمل محرك فِراسـة؟
        </h1>
        <p className="text-slate-500 text-xl mb-16 leading-relaxed">
          وراء كل نتيجة تراها، هناك عملية معقدة من معالجة اللغات الطبيعية (NLP) تجري في أجزاء من الثانية.
        </p>

        <div className="grid grid-cols-1 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex gap-8 items-start"
            >
              <div className="p-4 bg-white rounded-2xl shadow-sm">{step.icon}</div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-slate-800">{step.title}</h3>
                <p className="text-slate-500 text-lg leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <Link to="/" className="text-sky-600 font-bold flex items-center gap-2">
          <ArrowRight className="rotate-180" /> العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}