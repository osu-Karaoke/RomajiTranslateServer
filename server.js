'use strict';
var Http = require('http'),
    Router = require('router'),
    server,
    router;

var port = process.env.PORT || 1337;

var url = require('url');

var BodyParser = require('body-parser');

//restful api 教學 : https://nodejust.com/node-js-restful-api-tutorial/
router = new Router();

//建了一個萌萌耷的Server
server = Http.createServer(function (request, response) {

    //call router
    router(request, response, function (error) {
        if (!error) {
            response.writeHead(404);
        } else {
            // Handle errors
            console.log(error.message, error.stack);
            response.writeHead(400);
        }
        response.end('RESTful API Server is running!');
    });
   
}).listen(port);

router.use(BodyParser.text());

//translate japanese
function translateJp(request, response) {

    //translate string
    var translateString = request.params.id;

    //if string is empty
    if (typeof translateString !== 'string') {
        console.log('Item not found', id);
        response.writeHead(404);
        response.end('\n');
        return;
    }

    //translate engine : https://github.com/hexenq/kuroshiro.js
    var kuroshiro = require("./src/kuroshiro");
    kuroshiro.init(function (err) {

        // translate to api format
        //var result = kuroshiro.toApiFormat('感じ取れたら手を繋ごう、重なるのは人生のライン and レミリア最高！', { mode: 'okurigana', to: 'romaji' });
        var result = kuroshiro.toApiFormat(translateString);

        //轉換成json格式輸出
        var jsonString = JSON.stringify(result);
        
        //console.log(jsonString);

        //header
        response.writeHead(201, {
            'Content-Type': 'text/plain; charset=utf-8'
        });

        //body
        response.end(jsonString);
    });
}
router.get('/translate/jp/:id', translateJp);


//第二隻API喵
function translateJp(request, response) {

    //translate string
    var queryData = url.parse(request.url, true).query;

    var listTranslate = queryData.str;

    //translate engine : https://github.com/hexenq/kuroshiro.js
    var kuroshiro = require("./src/kuroshiro");
    kuroshiro.init(function (err) {

        var listResult = [];

        for (var i = 0; i < listTranslate.length; i++) {
            // translate to api format
            var result = kuroshiro.toApiFormat(listTranslate[i]);

            listResult.push(result);
        }

        //轉換成json格式輸出
        var jsonString = JSON.stringify(listResult);

        //console.log(jsonString);

        //header
        response.writeHead(201, {
            'Content-Type': 'text/plain; charset=utf-8'
        });

        //body
        response.end(jsonString);
    });
}
router.get('/translate/jp/list:id', translateJp);
