let http = require('http');
var port = 3000

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!, server 1');
}).listen(port, () => console.log(`Server 1 on port ${port}`));

