const fs = require('fs');
let content = fs.readFileSync('frontend/index.html', 'utf8');
const regex = /\s*<!-- Absolute tags -->\s*<div class="absolute top-4 left-4 z-10 flex flex-col gap-2">\s*<span[^>]*>[^<]*<\/span>\s*<\/div>/g;
content = content.replace(regex, '');
fs.writeFileSync('frontend/index.html', content);
