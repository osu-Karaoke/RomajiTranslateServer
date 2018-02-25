'use strict';
var http = require('http');
var port = process.env.PORT || 1337;


//建了一個萌萌耷的Server
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    var kuroshiro = require("kuroshiro");
    kuroshiro.init(function (err) {
        // kuroshiro is ready
        var result = kuroshiro.convert('感じ取れたら手を繋ごう、重なるのは人生のライン and レミリア最高！');
        console.log(result);
        console.log('測試輸出中文');
    });

    res.end('Hello World\n');
}).listen(port);
