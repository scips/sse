var http = require('http');
var fs = require('fs');

var static = require('node-static');
var fileServer = new static.Server('./public');
 
http.createServer(function (request, response) {
    fileServer.serve(request, response, function (err, result) {
      console.log('Requested: ' + request.url + ' - ' + response.message);
    });
}).listen(8080);

http.createServer(function(req, res) {
  debugHeaders(req);

  if (req.headers.accept && req.headers.accept == 'text/event-stream') {
    if (req.url == '/events') {
      sendSSE(req, res);
    } else {
      res.writeHead(404);
      res.end();
    }
  }
}).listen(8000);

console.log('Server address: http://localhost:8080/iframes.html');

function sendSSE(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  var id = (new Date()).toLocaleTimeString();

  setInterval(function() {
    constructSSE(res, id, (new Date()).toLocaleString('fr-BE'));
  }, 500);

  constructSSE(res, id, (new Date()).toLocaleString('fr-BE'));
}

function constructSSE(res, id, data) {
  res.write('id: ' + id + '\n');
  res.write('data: ' + data + '\n\n');
}

function debugHeaders(req) {
  console.log('URL: ' + req.url);
  for (var key in req.headers) {
    console.log(key + ': ' + req.headers[key]);
  }
  console.log('\n\n');
}