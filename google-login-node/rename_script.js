const fs = require('fs');
const path = require('path');

const frontendDir = path.join(__dirname, 'frontend');

function processDirectory(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            const fullPath = path.join(directory, file);
            fs.stat(fullPath, (err, stat) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

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
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        let updatedData = data
            // Fix logo extensions
            .replace(/ags_academy_logo_dark\.png/g, 'ags_academy_logo_dark.svg')
            .replace(/ags_academy_logo\.png/g, 'ags_academy_logo.svg')
            
            // Replace isolated GK text where relevant
            .replace(/>GK</g, '>AGS<')
            .replace(/>GK </g, '>AGS <')
            .replace(/"GK"/g, '"AGS"');

        if (updatedData !== data) {
            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                } else {
                    console.log(`Updated: ${filePath}`);
                }
            });
        }
    });
}

processDirectory(frontendDir);
