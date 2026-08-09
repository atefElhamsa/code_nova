const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(file));
        } else {
            if (file.endsWith('.mdx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walkDir('docs');
let changed = 0;
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    if (content.includes('↔')) {
        content = content.replace(/↔/g, '-');
        fs.writeFileSync(f, content, 'utf8');
        changed++;
    }
});
console.log(`Fixed arrows in ${changed} files.`);
