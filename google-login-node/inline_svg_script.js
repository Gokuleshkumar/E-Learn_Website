const fs = require('fs');
const path = require('path');

const frontendDir = path.join(__dirname, 'frontend');

const svgIcon = `<svg xmlns="http://www.svg.org/2000/svg" viewBox="0 0 100 100" class="h-10 w-auto">
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
</svg>`;

function processDirectory(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) return;
        files.forEach(file => {
            const fullPath = path.join(directory, file);
            fs.stat(fullPath, (err, stat) => {
                if (err) return;
                if (stat.isDirectory()) {
                    processDirectory(fullPath);
                } else if (path.extname(fullPath) === '.html' || path.extname(fullPath) === '.js') {
                    replaceInFile(fullPath);
                }
            });
        });
    });
}

function replaceInFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return;

        // Replace any img tag that has the base64 logo or the old svg logo
        let updatedData = data.replace(/<img[^>]*src=["'](?:data:image\/svg\+xml;base64,[^"']+|logos\/ags_academy_logo(?:_dark)?\.svg)["'][^>]*>/g, svgIcon);

        if (updatedData !== data) {
            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                if (err) console.error(err);
                else console.log(`Inlined SVG: ${filePath}`);
            });
        }
    });
}

processDirectory(frontendDir);
