let http = require('http');
var port = 3001

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Connexion to server 2');
}).listen(port, () => console.log(`Server 2 on port ${port}`));     