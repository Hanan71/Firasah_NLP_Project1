import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// استيراد الملفات بناءً على ما ظهر في صور المجلدات
import App from './pages/App'; // هذا هو ملفك الأساسي
import About from './pages/About';
import FAQ from './pages/FAQ';
import HowItWorks from './pages/HowItWorks';
import Methodology from './pages/Methodology';
// @ts-ignore
import './index.css';


const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* الربط مع الملف الأساسي App */}
        <Route path="/" element={<App />} />
        
        {/* الروابط الفرعية */}
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} /> 
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/methodology" element={<Methodology />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);