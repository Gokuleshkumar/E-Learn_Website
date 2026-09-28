const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const replacement = `<a href="index.html" class="flex items-center gap-2 shrink-0">
              <svg xmlns="http://www.svg.org/2000/svg" viewBox="0 0 100 100" class="h-10 w-auto">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
  </defs>
  <path d="M20 70 L45 20 L70 70 M32 45 L58 45" stroke="url(#grad1)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  <circle cx="45" cy="20" r="8" fill="#1d4ed8" />
  <circle cx="20" cy="70" r="8" fill="#3b82f6" />
  <circle cx="70" cy="70" r="8" fill="#3b82f6" />
</svg>
              <div class="flex items-baseline gap-1">
                <span class="font-bold text-2xl text-white hidden sm:block">AGS</span>
                <span class="font-bold text-2xl text-[var(--purple)] hidden sm:block" style="color: #7C3AED;">ACADEMY</span>
              </div>
          </a>`;
      
const indexReplacement = `<a href="#Home" class="flex items-center gap-2 shrink-0">
        <svg xmlns="http://www.svg.org/2000/svg" viewBox="0 0 100 100" class="h-10 w-auto">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
  </defs>
  <path d="M20 70 L45 20 L70 70 M32 45 L58 45" stroke="url(#grad1)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  <circle cx="45" cy="20" r="8" fill="#1d4ed8" />
  <circle cx="20" cy="70" r="8" fill="#3b82f6" />
  <circle cx="70" cy="70" r="8" fill="#3b82f6" />
</svg>
        <div class="flex items-baseline gap-1">
          <span class="font-display text-2xl font-800 text-white hidden sm:block">AGS</span>
          <span class="font-display text-2xl font-800 text-[var(--purple)] hidden sm:block" style="color: #7C3AED;">ACADEMY</span>
        </div>
      </a>`;

let count = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  if (file === 'index.html') {
    content = content.replace(/<a href="#Home" class="flex items-center shrink-0">[\s\S]*?<\/a>/, indexReplacement);
  } else {
    content = content.replace(/<a href="index\.html" class="flex items-center shrink-0">[\s\S]*?<\/a>/, replacement);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    count++;
    console.log("Updated", file);
  }
}
console.log("Total updated:", count);
