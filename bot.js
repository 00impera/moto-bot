
const http = require('http');
http.createServer((req, res) => res.end('OK')).listen(process.env.PORT || 3000);
