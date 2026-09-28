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

  // 1. Change grid to 4 columns on large screens
  content = content.replace(/class="grid grid-cols-1 md:grid-cols-3 gap-8"/g, 'class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"');

  // 2. Update Duration text
  const durationRegex = /(<h3 class="text-xl font-semibold mb-2">📅 Duration<\/h3>\s*<p>)(.*?)(<\/p>)/g;
  content = content.replace(durationRegex, '$11.5hr/session, 5 days/week$3');

  // 3. Add Languages card after Projects card
  const projectsRegex = /(<div class="bg-white shadow-md rounded-xl p-6 text-center">\s*<h3 class="text-xl font-semibold mb-2">💻 Projects<\/h3>\s*<p>.*?<\/p>\s*<\/div>)/g;
  
  if (content.match(projectsRegex) && !content.includes('🌐 Languages')) {
    const languagesCard = `
      <div class="bg-white shadow-md rounded-xl p-6 text-center">
        <h3 class="text-xl font-semibold mb-2">🌐 Languages</h3>
        <p>English, Tamil</p>
      </div>`;
    content = content.replace(projectsRegex, '$1' + languagesCard);
  }

  fs.writeFileSync(p, content);
  console.log(`Updated ${f}`);
});
