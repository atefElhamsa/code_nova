const fs = require('fs');
let content = fs.readFileSync('docusaurus.config.ts', 'utf8');

content = content.replace(
  `items: [
          {to: '/', label: 'الرئيسية', position: 'right'},
          {to: '/about', label: 'من نحن', position: 'right'},
        ]`,
  `items: [
          {to: '/', label: 'الرئيسية', position: 'right'},
          {to: '/about', label: 'من نحن', position: 'right'},
          {to: '/settings', label: 'حسابي', position: 'right'},
        ]`
);

fs.writeFileSync('docusaurus.config.ts', content);
