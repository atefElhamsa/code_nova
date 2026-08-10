import React from 'react';
import AccessGate from '../components/AccessGate';

export default function Root({children}: {children: React.ReactNode}) {
  return (
    <AccessGate>
      {children}
      <div className="mobile-blocker">
        <div className="mobile-blocker-content">
          <div className="mobile-blocker-icon">💻 ⚠️</div>
          <h2>عفواً، الشاشة صغيرة جداً!</h2>
          <p>
            هذه الدورة البرمجية مصممة خصيصاً ليتم عرضها على <strong>أجهزة الكمبيوتر (Laptops/Desktops)</strong> أو <strong>الأجهزة اللوحية (Tablets)</strong> لضمان أفضل تجربة قراءة وعرض للأكواد البرمجية.
          </p>
          <p>
            يرجى فتح الموقع من جهاز بشاشة عرض أكبر لمواصلة التعلم! 🚀
          </p>
        </div>
      </div>
    </AccessGate>
  );
}
