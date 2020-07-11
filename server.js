const http = require('http');
const app = require('./app');
// const lievData = require('./index');

const port = 3000;

const server = http.createServer(app);
// const server = http.createServer(index);

server.listen(port);