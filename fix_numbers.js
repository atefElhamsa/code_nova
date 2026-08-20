const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8');
        let newContent = content
            .replace(/01272442829/g, '01552946586')
            .replace(/201272442829/g, '201552946586');
        
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent);
            console.log(`Updated numbers in ${filePath}`);
        }
    }
}

replaceInFile('src/components/AccessGate.tsx');
replaceInFile('src/pages/about.tsx');
replaceInFile('src/pages/index.tsx');
