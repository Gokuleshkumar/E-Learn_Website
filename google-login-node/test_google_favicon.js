const https = require('https');
const fs = require('fs');

const url = 'https://www.google.com/s2/favicons?domain=zoho.com&sz=128';
const file = fs.createWriteStream('frontend/logos/zoho.png');

https.get(url, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    console.log('Downloaded Google Favicon for Zoho');
  });
}).on('error', (err) => {
  console.error(err);
});
