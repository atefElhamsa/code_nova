const fs = require('fs');

// 1. Update admin.tsx
let adminContent = fs.readFileSync('src/pages/admin.tsx', 'utf-8');

adminContent = adminContent.replace(
  `width: 130, height: 130`,
  `width: 170, height: 170`
);

adminContent = adminContent.replace(
  `width: 50px; height: 50px; border-radius: 50%;`,
  `width: 65px; height: 65px; border-radius: 50%; background: transparent;`
);

fs.writeFileSync('src/pages/admin.tsx', adminContent);

// 2. Update index.tsx
let homeContent = fs.readFileSync('src/pages/index.tsx', 'utf-8');

homeContent = homeContent.replace(
  `width: 100, height: 100, borderRadius: '50%'`,
  `width: 160, height: 160, borderRadius: '50%', background: 'transparent'`
);

fs.writeFileSync('src/pages/index.tsx', homeContent);

// 3. Update Root.tsx (AccessGate)
let rootContent = fs.readFileSync('src/theme/Root.tsx', 'utf-8');
rootContent = rootContent.replace(
  `.ag-logo { width:140px; height:140px; border-radius:50%; object-fit:cover; animation:ag-float 4s ease-in-out infinite; border:2px solid rgba(56, 189, 248, 0.3); }`,
  `.ag-logo { width:160px; height:160px; border-radius:50%; background:transparent; object-fit:cover; animation:ag-float 4s ease-in-out infinite; border:2px solid rgba(56, 189, 248, 0.3); }`
);
// Also for mobile view in Root.tsx
rootContent = rootContent.replace(
  `.ag-logo { width: 100px; height: 100px; }`,
  `.ag-logo { width: 130px; height: 130px; }`
);
fs.writeFileSync('src/theme/Root.tsx', rootContent);

// 4. Update custom.css for the Navbar logo
let cssContent = fs.readFileSync('src/css/custom.css', 'utf-8');
if (!cssContent.includes('.navbar__logo img')) {
  cssContent += `
.navbar__logo img {
  border-radius: 50% !important;
  background: transparent !important;
  box-shadow: 0 0 10px rgba(56,189,248,0.3);
}
`;
} else {
  cssContent = cssContent.replace(
    `.navbar__logo img {`,
    `.navbar__logo img {
  border-radius: 50% !important;
  background: transparent !important;
  box-shadow: 0 0 10px rgba(56,189,248,0.3);`
  );
}
fs.writeFileSync('src/css/custom.css', cssContent);
