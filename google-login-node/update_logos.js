const fs = require('fs');
const path = require('path');
const dir = 'frontend';

const oldSvgRegex = /<svg\s+xmlns="http:\/\/www\.svg\.org\/2000\/svg"\s+viewBox="0 0 100 100"\s+class="h-10 w-auto">[\s\S]*?<\/svg>/g;
const newSvg = `<svg xmlns="http://www.svg.org/2000/svg" viewBox="0 0 100 100" class="h-10 w-auto">
  <defs>
    <linearGradient id="gradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5624d0" />
      <stop offset="100%" stop-color="#401b9c" />
    </linearGradient>
  </defs>
  <path d="M20 70 L45 20 L70 70 M32 45 L58 45" stroke="url(#gradLogo)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  <circle cx="45" cy="20" r="8" fill="#401b9c" />
  <circle cx="20" cy="70" r="8" fill="#5624d0" />
  <circle cx="70" cy="70" r="8" fill="#5624d0" />
</svg>`;

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;
files.forEach(f => {
  if (['index.html', 'dash.html', 'Aboutus.html', 'contactus.html', 'login.html', 'signup.html', 'forgot-password.html', 'logstud.html', 'signstud.html', 'loginstud.html'].includes(f)) return;
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  if (oldSvgRegex.test(content)) {
    content = content.replace(oldSvgRegex, newSvg);
    fs.writeFileSync(p, content);
    count++;
    console.log('Updated ' + f);
  }
});
console.log('Updated ' + count + ' files.');
