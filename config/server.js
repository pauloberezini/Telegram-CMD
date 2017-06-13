var http = require('http');
var fs = require('fs');

var start =
    http.createServer(function (req, res) {
        fs.readFile('./html/index.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }).listen(8080);
module.exports.start = start;