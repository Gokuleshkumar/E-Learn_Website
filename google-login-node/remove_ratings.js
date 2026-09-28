const fs = require('fs');
let content = fs.readFileSync('frontend/index.html', 'utf8');
const regex = /\s*<div class="flex items-center gap-1 text-sm mb-3">\s*<span class="stars[^>]*>[\s\S]*?<\/div>/g;
content = content.replace(regex, '');
fs.writeFileSync('frontend/index.html', content);
console.log('Done');
