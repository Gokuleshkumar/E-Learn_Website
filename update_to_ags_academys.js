const fs = require('fs');
const path = require('path');

const frontendDir = path.join(__dirname, 'google-login-node', 'frontend');

// 1. Process all HTML files in frontend
const htmlFiles = fs.readdirSync(frontendDir).filter(f => f.endsWith('.html'));

let totalHtmlUpdated = 0;

htmlFiles.forEach(file => {
    const filePath = path.join(frontendDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Replace split span logos:
    // e.g. <span class="font-display text-2xl font-800 text-[var(--purple)] ...">Academy</span>
    content = content.replace(/(<span[^>]*>AGS<\/span>\s*<span[^>]*>)Academy(<\/span>)/g, '$1Academys$2');

    // Replace any remaining >Academy< inside logo anchors or navbar
    content = content.replace(/(text-udemy-purple">)Academy(<\/span>)/g, '$1Academys$2');
    content = content.replace(/(text-\[var\(--purple\)\][^>]*>)Academy(<\/span>)/g, '$1Academys$2');

    // Replace "AGS Academy" plain text (titles, headings, footers, copy)
    content = content.replace(/AGS Academy/g, 'AGS Academys');
    content = content.replace(/AGS ACADEMY/g, 'AGS ACADEMYS');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        totalHtmlUpdated++;
        console.log(`Updated HTML: ${file}`);
    }
});

console.log(`Total HTML files updated: ${totalHtmlUpdated}`);

// 2. Process SVG files in frontend/logos
const logosDir = path.join(frontendDir, 'logos');
if (fs.existsSync(logosDir)) {
    const svgFiles = fs.readdirSync(logosDir).filter(f => f.endsWith('.svg'));
    svgFiles.forEach(file => {
        const filePath = path.join(logosDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        const original = content;

        content = content.replace(/Academy/g, 'Academys');
        content = content.replace(/ACADEMY/g, 'ACADEMYS');

        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated SVG: ${file}`);
        }
    });
}

// 3. Process server.js
const serverPath = path.join(__dirname, 'google-login-node', 'server.js');
if (fs.existsSync(serverPath)) {
    let serverContent = fs.readFileSync(serverPath, 'utf8');
    const origServer = serverContent;
    serverContent = serverContent.replace(/AGS Academy/g, 'AGS Academys');
    serverContent = serverContent.replace(/AGS ACADEMY/g, 'AGS ACADEMYS');
    if (serverContent !== origServer) {
        fs.writeFileSync(serverPath, serverContent, 'utf8');
        console.log('Updated server.js');
    }
}

// 4. Process logo_full_300.html
const logoFullHtml = path.join(__dirname, 'google-login-node', 'logo_full_300.html');
if (fs.existsSync(logoFullHtml)) {
    let content = fs.readFileSync(logoFullHtml, 'utf8');
    content = content.replace(/Academy/g, 'Academys');
    fs.writeFileSync(logoFullHtml, content, 'utf8');
    console.log('Updated logo_full_300.html');
}

// 5. Process fix_logo.js & update_logos.js
const scripts = ['fix_logo.js', 'replace_logo.js', 'update_footer_logo.js'];
scripts.forEach(script => {
    const p = path.join(frontendDir, script);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        content = content.replace(/Academy/g, 'Academys');
        fs.writeFileSync(p, content, 'utf8');
        console.log(`Updated helper script: ${script}`);
    }
});

console.log('All branding text and logos successfully updated to AGS Academys!');
