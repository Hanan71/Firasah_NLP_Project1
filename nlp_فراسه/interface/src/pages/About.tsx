import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Target, ShieldCheck, Star } from 'lucide-react';

export default function About() {
  const team = ["أميرة الدعجاني", "متعبة الدوسري", "رغد فايز", "نوف القاسم", "حنان عثمان"];

  return (
    <div className="min-h-screen bg-white text-slate-900 p-8 md:p-20 selection:bg-sky-100" dir="rtl">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center md:text-right"
        >
          <h1 className="text-5xl font-black mb-6 bg-gradient-to-l from-sky-600 to-sky-400 bg-clip-text text-transparent leading-tight">
            عن مشروع محلل المشاعر الذكي (فِراسـة)
          </h1>
          <p className="text-slate-500 text-xl leading-relaxed max-w-2xl">
            منصة مبتكرة تسخر قوة الذكاء الاصطناعي لفهم وتحليل المشاعر في النصوص العربية بدقة وعمق، لتمكين الأفراد والمؤسسات من فهم لغة الحوار الرقمي.
          </p>
        </motion.div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 bg-sky-50 rounded-[2.5rem] border border-sky-100 shadow-sm"
          >
            <Target className="text-sky-500 mb-4 w-10 h-10" />
            <h3 className="text-2xl font-bold mb-3 text-slate-800">رؤيتنا</h3>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">
              أن نكون المرجع الأول في تحليل المشاعر العربية، والمساهمة في إثراء المحتوى التقني العربي بأدوات ذكية متطورة.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm"
          >
            <ShieldCheck className="text-slate-500 mb-4 w-10 h-10" />
            <h3 className="text-2xl font-bold mb-3 text-slate-800">الخصوصية</h3>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">
              نلتزم بأعلى معايير الأمان؛ حيث يتم معالجة النصوص لحظياً دون تخزينها، لضمان خصوصية مطلقة لمستخدمينا.
            </p>
          </motion.div>
        </div>

{/* Team Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Users className="text-sky-500" />
            <h2 className="text-3xl font-black">فريق العمل</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-4 bg-white border border-slate-100 shadow-sm rounded-2xl flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-sky-400 rounded-full" />
                <span className="font-bold text-slate-700">{member}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scientific Methodology Note */}
        <div className="p-10 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden mb-16 shadow-2xl">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 text-sky-400">
              <Star size={20} fill="currentColor" />
              <span className="font-black uppercase tracking-widest text-sm">جامعة شقراء</span>
            </div>
            <h3 className="text-3xl font-bold mb-4">لماذا فِراسـة للذكاء؟</h3>
            <p className="text-slate-300 leading-relaxed text-xl font-light">
              مشروعنا ليس مجرد أداة برمجية، بل هو ثمرة بحث وتطوير في مجال معالجة اللغات الطبيعية (NLP)، مصمم خصيصاً ليتناسب مع تعقيدات وجماليات اللغة العربية وتعدد لهجاتها.
            </p>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-sky-500/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Navigation Link - العودة للرئيسية */}
        <div className="flex justify-center md:justify-start pb-10">
          <Link 
            to="/" 
            className="group flex items-center gap-4 text-sky-600 font-black text-2xl hover:text-sky-700 transition-all"
          >
            <div className="p-3 bg-sky-50 rounded-full group-hover:bg-sky-100 transition-colors">
               <ArrowRight className="rotate-180 w-6 h-6" />
            </div>
            <span>العودة للمحلل الذكي</span>
          </Link>
        </div>

      </div>
    </div>
  );
}