const https = require('https');
const fs = require('fs');

const logos = {
  'zoho': 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/zoho.svg',
  'tcs': 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/tata.svg',
  'infosys': 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/infosys.svg',
  'wipro': 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/wipro.svg',
  'accenture': 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/accenture.svg'
};

Object.entries(logos).forEach(([name, url]) => {
  https.get(url, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      fs.writeFileSync(`frontend/logos/${name}.svg`, data);
      console.log(`Saved ${name}.svg`);
    });
  }).on('error', err => console.log(`Error on ${name}:`, err.message));
});
