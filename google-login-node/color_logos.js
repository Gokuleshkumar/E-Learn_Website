const fs = require('fs');
let t = fs.readFileSync('frontend/logos/tcs.svg', 'utf8');
t = t.replace('<svg ', '<svg fill="#2563EB" ');
fs.writeFileSync('frontend/logos/tcs.svg', t);

let i = fs.readFileSync('frontend/logos/infosys.svg', 'utf8');
i = i.replace('<svg ', '<svg fill="#007BC0" ');
fs.writeFileSync('frontend/logos/infosys.svg', i);

let a = fs.readFileSync('frontend/logos/accenture.svg', 'utf8');
a = a.replace('<svg ', '<svg fill="#a100ff" ');
fs.writeFileSync('frontend/logos/accenture.svg', a);

console.log('Colored SVGs');
