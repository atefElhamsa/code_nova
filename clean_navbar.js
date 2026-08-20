const fs = require('fs');
let content = fs.readFileSync('docusaurus.config.ts', 'utf8');

// Replace the entire items array in navbar
content = content.replace(
  /items:\s*\[[\s\S]*?\]/m,
  `items: [
          {to: '/', label: 'الرئيسية', position: 'right'},
          {to: '/about', label: 'من نحن', position: 'right'},
        ]`
);

fs.writeFileSync('docusaurus.config.ts', content);
