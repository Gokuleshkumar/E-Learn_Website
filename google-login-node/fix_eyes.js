const fs = require('fs');
const path = require('path');

const frontendDir = path.join(__dirname, 'frontend');

const cssSnippet = `
    /* Hide default browser password reveal icon */
    input[type="password"]::-ms-reveal,
    input[type="password"]::-ms-clear {
      display: none;
    }
`;

function processDirectory(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) return;
        files.forEach(file => {
            const fullPath = path.join(directory, file);
            fs.stat(fullPath, (err, stat) => {
                if (err) return;
                if (stat.isDirectory()) {
                    processDirectory(fullPath);
                } else if (path.extname(fullPath) === '.html') {
                    replaceInFile(fullPath);
                }
            });
        });
    });
}

function replaceInFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return;

        // Skip if already applied
        if (data.includes('::-ms-reveal')) return;

        // Insert before </style>
        if (data.includes('</style>')) {
            let updatedData = data.replace('</style>', cssSnippet + '</style>');
            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                if (err) console.error(err);
                else console.log(`Fixed duplicate eye icon: ${filePath}`);
            });
        }
    });
}

processDirectory(frontendDir);
