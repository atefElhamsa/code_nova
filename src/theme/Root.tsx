import React from 'react';
import AccessGate from '../components/AccessGate';

export default function Root({children}: {children: React.ReactNode}) {
  return (
    <AccessGate>
      {children}
      <div className="mobile-blocker">
        <div className="mobile-blocker-content">
          <div className="mobile-blocker-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          </div>
          <h1 className="mobile-blocker-title" style={{fontSize: '1.8rem', fontWeight: 800, margin: '16px 0'}}>عفواً، الشاشة صغيرة جداً!</h1>
          <p className="mobile-blocker-text" style={{lineHeight: 1.8, color: '#94a3b8', fontSize: '1.05rem', margin: '0 0 16px'}}>
            هذه الدورة البرمجية مصممة خصيصاً ليتم عرضها على <strong>أجهزة الكمبيوتر (Laptops/Desktops)</strong> أو <strong>الأجهزة اللوحية (Tablets)</strong> لضمان أفضل تجربة قراءة وعرض للأكواد البرمجية.
          </p>
          <div className="mobile-blocker-text" style={{marginTop:'12px', fontWeight:600, color:'#38bdf8'}}>
            يرجى فتح الموقع من جهاز بشاشة عرض أكبر لمواصلة التعلم! 
            <svg width="18" height="18" style={{marginRight: '6px', verticalAlign: 'middle'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5-4 5-4"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 4-5 4-5"></path></svg>
          </div>
        </div>
      </div>
    </AccessGate>
  );
}
