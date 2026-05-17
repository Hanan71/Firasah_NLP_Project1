import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, Globe, Layers, Wind, ArrowRight } from 'lucide-react';

export default function Methodology() {
  const tools = [
    { name: "React & Vite", desc: "لبناء واجهة مستخدم سريعة، تفاعلية، وقابلة للتوسع.", icon: <Globe /> },
    { name: "Tailwind CSS", desc: "لتصميم واجهة Minimalist عصرية بأعلى معايير الـ UI/UX.", icon: <Wind /> },
    { name: "Framer Motion", desc: "لإضافة حركات انسيابية تزيد من تفاعل المستخدم مع النتائج.", icon: <Layers /> },
    { name: "Lucide Icons", desc: "لتوفير نظام أيقونات دلالي وواضح للمستخدم العربي.", icon: <Terminal /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8" dir="rtl">
      <div className="max-w-4xl mx-auto pt-20">
        <span className="text-sky-500 font-black tracking-widest uppercase text-sm">جامعة شقراء - كلية الحاسب</span>
        <h1 className="text-4xl font-black text-slate-900 mt-4 mb-12">المنهجية العلمية والأدوات</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {tools.map((tool, index) => (
            <motion.div 
              key={index} 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm"
            >
              <div className="text-sky-500 mb-4">{tool.icon}</div>
              <h3 className="text-xl font-black mb-2">{tool.name}</h3>
              <p className="text-slate-500 leading-relaxed">{tool.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-slate-900 text-white p-10 rounded-[3rem] text-center mb-16 shadow-xl">
          <h3 className="text-2xl font-bold mb-4">فلسفة التصميم</h3>
          <p className="text-slate-400 leading-relaxed italic text-lg font-light">
            تم التركيز على البساطة (Minimalism) والوضوح اللغوي لضمان وصول الخدمة لجميع فئات المستخدمين بسهولة تامة.
          </p>
        </div>

        {/* زر العودة للمحلل الذكي */}
        <div className="flex justify-center pb-12">
          <Link 
            to="/" 
            className="group flex items-center gap-3 text-sky-600 font-black text-2xl hover:text-sky-700 transition-all"
          >
            <div className="p-3 bg-sky-100 rounded-full group-hover:bg-sky-200 transition-colors">
               <ArrowRight className="rotate-180 w-6 h-6" />
            </div>
            <span>العودة للمحلل الذكي</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
