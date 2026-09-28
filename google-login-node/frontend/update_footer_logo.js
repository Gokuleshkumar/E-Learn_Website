const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let count = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  if (file === 'index.html') {
    content = content.replace(
      /<h2 class="font-display font-700 text-xl mb-3">AGS Academy<\/h2>/g,
      `<a href="#Home" class="flex items-center gap-2 mb-3">
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
            <span class="font-display text-xl font-800 text-white">AGS</span>
            <span class="font-display text-xl font-800 text-[var(--purple)]">Academy</span>
          </div>
        </a>`
    );
  } else if (file === 'details.html') {
    content = content.replace(
      /<footer class="bg-white border-t border-gray-200 py-12">[\s\S]*?<\/footer>/,
      `<!-- Footer -->
    <footer class="bg-[#141417] text-[#8B899A] py-12 mt-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="flex items-center justify-center gap-2 mb-4">
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
                  <span class="font-display text-2xl font-800 text-white">AGS</span>
                  <span class="font-display text-2xl font-800 text-[var(--purple)]">Academy</span>
                </div>
            </div>
            <p class="text-sm">© 2026 AGS Academy. All rights reserved.</p>
        </div>
    </footer>`
    );
  } else {
    // For course pages
    content = content.replace(
      /<a href="index\.html" class="flex items-baseline gap-1">[\s\S]*?<\/a>/g,
      `<a href="index.html" class="flex items-center gap-2">
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
                  <span class="font-display text-2xl font-800 text-white">AGS</span>
                  <span class="font-display text-2xl font-800 text-[var(--purple)]">Academy</span>
                </div>
              </a>`
    );
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    count++;
    console.log("Updated footer in", file);
  }
}
console.log("Total footers updated:", count);
