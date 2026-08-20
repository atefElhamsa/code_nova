const fs = require('fs');

let content = fs.readFileSync('src/pages/admin.tsx', 'utf-8');

// Replace Sidebar logo SVG with Image
content = content.replace(
  `<div className="v-logo-icon">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
  </div>`,
  `<img src="/img/codeNovaLogo.jpg" alt="CodeNova Logo" className="v-logo-icon" style={{ objectFit: 'cover' }} />`
);

// If the first replace didn't match because of the patch_animations.js modifying it:
content = content.replace(
  `<div className="v-logo-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg></div>`,
  `<img src="/img/codeNovaLogo.jpg" alt="CodeNova Logo" className="v-logo-icon" style={{ objectFit: 'cover' }} />`
);


// Replace Login screen SVG with Image
content = content.replace(
  `<div style={{ width: 80, height: 80, borderRadius: 24, background: 'var(--primary-glow)', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>`,
  `<img src="/img/codeNovaLogo.jpg" alt="CodeNova Logo" style={{ width: 90, height: 90, borderRadius: 24, margin: '0 auto 24px', display: 'block', objectFit: 'cover', border: '2px solid rgba(56, 189, 248, 0.4)', animation: 'glowPulse 2.5s infinite', boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)' }} />`
);


fs.writeFileSync('src/pages/admin.tsx', content);
