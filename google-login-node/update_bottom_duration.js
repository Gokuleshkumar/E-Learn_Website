const fs = require('fs');
const path = require('path');
const dir = 'frontend';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const courseFiles = [
  'ai.html', 'backend.html', 'cybersecurity.html', 'datascience.html',
  'dsa.html', 'frontend.html', 'java.html', 'ml.html', 'python.html',
  'quantum.html', 'uiux.html', 'webdev.html'
];

files.forEach(f => {
  if (!courseFiles.includes(f)) return;
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');

  // We are changing the bottom Course Details grid Duration to 3 Months.
  // Format:
  // <h4 class="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Duration</h4>
  // <p class="text-lg font-bold text-gray-900">1.5 hr / session</p>
  content = content.replace(/(<h4[^>]*>Duration<\/h4>\s*<p[^>]*>).*?(<\/p>)/g, '$13 Months$2');

  fs.writeFileSync(p, content);
  console.log(`Updated ${f}`);
});
