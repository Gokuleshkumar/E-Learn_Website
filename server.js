const path = require('path');

// Change working directory to google-login-node so all relative paths (frontend, models, .env) resolve properly
process.chdir(path.join(__dirname, 'google-login-node'));

// Run the main server
require('./google-login-node/server.js');