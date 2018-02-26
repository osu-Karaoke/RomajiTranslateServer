'use strict';
var http = require('http');
var port = process.env.PORT || 1337;

//translate engine : https://github.com/hexenq/kuroshiro.js

//建了一個萌萌耷的Server
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    var kuroshiro = require("./src/kuroshiro");
    kuroshiro.init(function (err) {
        // kuroshiro is ready
        //var result = kuroshiro.toApiFormat('感じ取れたら手を繋ごう、重なるのは人生のライン and レミリア最高！', { mode: 'okurigana', to: 'romaji' });
        var result = kuroshiro.toApiFormat('感じ取れたら手を繋ごう、重なるのは人生のライン and レミリア最高！', { mode: 'okurigana', to: 'romaji' });
        console.log(result);
        
        res.end(result);
    });

   
}).listen(port);
