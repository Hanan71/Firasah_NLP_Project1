import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "كيف يقوم النظام بتحليل المشاعر؟",
    a: "نستخدم نماذج متقدمة في معالجة اللغات الطبيعية (NLP) تم تدريبها خصيصاً على فهم سياقات اللغة العربية، حيث يتم تحليل الكلمات والتركيبات اللغوية لتصنيفها بدقة."
  },
  {
    q: "هل يدعم المحلل اللهجات العامية؟",
    a: "نعم، تم تصميم نظام 'فِراسـة' ليتعامل مع الفصحى وأغلب اللهجات الدارجة، مع تطوير مستمر لفهم المصطلحات الحديثة."
  },
  {
    q: "ما مدى دقة نتائج التحليل؟",
    a: "تصل دقة التحليل حالياً إلى مستويات عالية جداً (تتجاوز 90% في النصوص الواضحة)، ونعمل دائماً على تحسين النماذج من خلال التغذية الراجعة."
  },
  {
    q: "هل بياناتي ونصوصي محفوظة؟",
    a: "خصوصيتك هي أولويتنا. النصوص التي يتم تحليلها تُعالج فورياً ولا يتم تخزينها في قواعد بياناتنا لضمان سرية معلوماتك."
  }
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-white text-slate-900 p-8" dir="rtl">
      <div className="max-w-3xl mx-auto pt-20">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex p-4 bg-sky-50 rounded-3xl text-sky-500 mb-6">
            <HelpCircle size={40} />
          </div>
          <h1 className="text-4xl font-black mb-4">الأسئلة الشائعة</h1>
          <p className="text-slate-500 text-lg">كل ما تود معرفته عن محرك فِراسـة لتحليل المشاعر</p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-sky-200 transition-all"
            >
              <div className="flex justify-between items-center gap-4">
                <h3 className="text-xl font-bold text-slate-800">{faq.q}</h3>
                <ChevronDown className="text-slate-300 group-hover:text-sky-500 transition-colors" />
              </div>
              <p className="mt-4 text-slate-500 leading-relaxed text-lg font-medium">
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer Link */}
        <motion.div className="mt-16 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sky-600 font-bold hover:underline">
            <ArrowRight size={20} className="rotate-180" />
            العودة للمحلل الذكي
          </Link>
        </motion.div>

      </div>
    </div>
  );
}