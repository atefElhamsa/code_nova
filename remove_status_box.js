const fs = require('fs');
let content = fs.readFileSync('src/pages/settings.tsx', 'utf-8');

// Find the block for the status box and remove it
const statusBoxRegex = /<div className="st-card" style=\{\{ marginBottom: '30px' \}\}>\s*<div className="st-status-box">.*?<\/div>\s*<\/div>/s;

if (statusBoxRegex.test(content)) {
    content = content.replace(statusBoxRegex, '');
    fs.writeFileSync('src/pages/settings.tsx', content);
    console.log("Removed the status box successfully.");
} else {
    console.log("Could not find the status box.");
}
