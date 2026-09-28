const fs = require('fs');
const path = require('path');

const frontendDir = path.join(__dirname, 'frontend');

// The base64 SVGs
const darkSvgBase64 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy5zdmcub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNDAwIDEwMCIgd2lkdGg9IjQwMCIgaGVpZ2h0PSIxMDAiPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkMSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzYjgyZjY7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzFkNGVkODtzdG9wLW9wYWNpdHk6MSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxwYXRoIGQ9Ik0yMCA3MCBMNDUgMjAgTDcwIDcwIE0zMiA0NSBMNTggNDUiIHN0cm9rZT0idXJsKCNncmFkMSkiIHN0cm9rZS13aWR0aD0iOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBmaWxsPSJub25lIiAvPgogIDxjaXJjbGUgY3g9IjQ1IiBjeT0iMjAiIHI9IjUiIGZpbGw9IiMxZDRlZDgiIC8+CiAgPGNpcmNsZSBjeD0iMjAiIGN5PSI3MCIgcj0iNSIgZmlsbD0iIzNiODJmNiIgLz4KICA8Y2lyY2xlIGN4PSI3MCIgY3k9IjcwIiByPSI1IiBmaWxsPSIjM2I4MmY2IiAvPgogIDx0ZXh0IHg9IjkwIiB5PSI2NSIgZm9udC1mYW1pbHk9IidTZWdvZSBVSScsIFJvYm90bywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjgwMCIgZmlsbD0iIzFlMjkzYiIgbGV0dGVyLXNwYWNpbmc9Ii0wLjUiPkFHUyA8dHNwYW4gZmlsbD0iIzNiODJmNiI+QWNhZGVteTwvdHNwYW4+PC90ZXh0Pgo8L3N2Zz4K";

const lightSvgBase64 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy5zdmcub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNDAwIDEwMCIgd2lkdGg9IjQwMCIgaGVpZ2h0PSIxMDAiPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkMSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM2MGE1ZmE7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzkzYzVmZDtzdG9wLW9wYWNpdHk6MSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxwYXRoIGQ9Ik0yMCA3MCBMNDUgMjAgTDcwIDcwIE0zMiA0NSBMNTggNDUiIHN0cm9rZT0idXJsKCNncmFkMSkiIHN0cm9rZS13aWR0aD0iOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBmaWxsPSJub25lIiAvPgogIDxjaXJjbGUgY3g9IjQ1IiBjeT0iMjAiIHI9IjUiIGZpbGw9IiM5M2M1ZmQiIC8+CiAgPGNpcmNsZSBjeD0iMjAiIGN5PSI3MCIgcj0iNSIgZmlsbD0iIzYwYTVmYSIgLz4KICA8Y2lyY2xlIGN4PSI3MCIgY3k9IjcwIiByPSI1IiBmaWxsPSIjNjBhNWZhIiAvPgogIDx0ZXh0IHg9IjkwIiB5PSI2NSIgZm9udC1mYW1pbHk9IidTZWdvZSBVSScsIFJvYm90bywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjgwMCIgZmlsbD0iI2Y4ZmFmYyIgbGV0dGVyLXNwYWNpbmc9Ii0wLjUiPkFHUyA8dHNwYW4gZmlsbD0iIzYwYTVmYSI+QWNhZGVteTwvdHNwYW4+PC90ZXh0Pgo8L3N2Zz4K";

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

        let updatedData = data
            .replace(/logos\/ags_academy_logo_dark\.svg/g, darkSvgBase64)
            .replace(/logos\/ags_academy_logo\.svg/g, lightSvgBase64);

        if (updatedData !== data) {
            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                if (err) console.error(err);
                else console.log(`Fixed Base64 Logo: ${filePath}`);
            });
        }
    });
}

processDirectory(frontendDir);
