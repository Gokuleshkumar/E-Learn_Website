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

  // 1. Top Section Fixes
  content = content.replace(/(<h3 class="text-xl font-semibold mb-2">📅 Duration<\/h3>\s*<p>).*?(<\/p>)/g, '$13 Months$2');
  content = content.replace(/(<h3 class="text-xl font-semibold mb-2">💻 Projects<\/h3>\s*<p>).*?(<\/p>)/g, '$13$2');
  
  // Also remove the extra languages card I mistakenly added in the top section
  content = content.replace(/\s*<div class="bg-white shadow-md rounded-xl p-6 text-center">\s*<h3 class="text-xl font-semibold mb-2">🌐 Languages<\/h3>\s*<p>.*?<\/p>\s*<\/div>/g, '');
  // And revert the grid from 4 to 3
  content = content.replace(/class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"/g, 'class="grid grid-cols-1 md:grid-cols-3 gap-8"');


  // 2. Bottom Section (Course Details)
  // Format:
  // <h4 class="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Duration</h4>
  // <p class="text-lg font-bold text-gray-900">1 hr / session</p>
  content = content.replace(/(<h4[^>]*>Duration<\/h4>\s*<p[^>]*>).*?(<\/p>)/g, '$11.5 hr / session$2');
  content = content.replace(/(<h4[^>]*>Schedule<\/h4>\s*<p[^>]*>).*?(<\/p>)/g, '$15 Days / Week$2');
  content = content.replace(/(<h4[^>]*>Languages<\/h4>\s*<p[^>]*>).*?(<\/p>)/g, '$1English, Tamil$2');

  // 3. Final CTA Button
  // Format: Enroll Now for ₹18,999
  content = content.replace(/Enroll Now for ₹[0-9,]+/g, 'Enroll Now');

  fs.writeFileSync(p, content);
  console.log(`Updated ${f}`);
});
