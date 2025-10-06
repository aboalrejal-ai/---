import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050A18] text-white px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-black mb-4">الارشاد الكامل - موقع النشاط الطلابي</h1>
      <p className="text-gray-300 max-w-2xl">
        منصة متكاملة لإدارة النشاط الطلابي. سجّل دخولك لبدء الاستخدام، أو جرّب تجربة الكيمياء ثلاثية الأبعاد.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link to="/login" className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-full">تسجيل الدخول</Link>
        <Link to="/chemistry" className="px-8 py-3 bg-white/10 border border-white/20 rounded-full">تجربة الكيمياء</Link>
      </div>
    </div>
  );
};

export default Landing;
