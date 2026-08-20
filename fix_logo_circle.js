const fs = require('fs');

let content = fs.readFileSync('src/pages/admin.tsx', 'utf-8');

// Fix Sidebar logo to be circular and slightly larger
content = content.replace(`.v-logo-icon {
          width: 44px; height: 44px; border-radius: 14px;
          background: rgba(56, 189, 248, 0.15); color: var(--primary);
          border: 1px solid rgba(56, 189, 248, 0.3);
          display: flex; align-items: center; justify-content: center;
          animation: glowPulse 2.5s infinite;
        }`, `.v-logo-icon {
          width: 50px; height: 50px; border-radius: 50%;
          border: 2px solid rgba(56, 189, 248, 0.5);
          display: flex; align-items: center; justify-content: center;
          animation: glowPulse 2.5s infinite;
        }`);

// Fix Login screen logo to be completely circular, larger, and no square behind it
content = content.replace(
  `<img src="/img/codeNovaLogo.jpg" alt="CodeNova Logo" style={{ width: 90, height: 90, borderRadius: 24, margin: '0 auto 24px', display: 'block', objectFit: 'cover', border: '2px solid rgba(56, 189, 248, 0.4)', animation: 'glowPulse 2.5s infinite', boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)' }} />`,
  `<img src="/img/codeNovaLogo.jpg" alt="CodeNova Logo" style={{ width: 130, height: 130, borderRadius: '50%', margin: '0 auto 24px', display: 'block', objectFit: 'cover', border: '3px solid rgba(56, 189, 248, 0.6)', animation: 'glowPulse 2.5s infinite' }} />`
);

fs.writeFileSync('src/pages/admin.tsx', content);
