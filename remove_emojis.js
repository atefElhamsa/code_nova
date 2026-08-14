const fs = require('fs');
const path = require('path');

const emojis = ['🎯', '📱', '🧹', '🏗️', '🌐', '🧪', '🚀', '⚡', '🐛', '🎤', '🏗', '🛡️'];

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.docusaurus')) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.mdx') || file.endsWith('.md')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('d:/Flutter Projects/doc_flutter/docs');
files.push('d:/Flutter Projects/doc_flutter/sidebars.ts');

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let content = fs.readFileSync(f, 'utf8');
  let original = content;
  emojis.forEach(e => {
    content = content.split(e).join('');
  });
  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Updated', f);
  }
});
