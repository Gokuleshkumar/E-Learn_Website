const fs = require('fs');
let content = fs.readFileSync('frontend/index.html', 'utf8');
const regex = /\s*<span\s+class="absolute top-3 left-3[^>]*>[\s\S]*?<\/span>/g;
content = content.replace(regex, '');
fs.writeFileSync('frontend/index.html', content);
