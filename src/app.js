var request = require('request');
var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');

var mongodb_path = process.env.MONGODB_URI;
var http_port = process.env.PORT;
mongoose.connect(mongodb_path)

var app = express()
var servicekey = fs.readFileSync(__dirname + "/servicekey.txt", "utf8")
servicekey = servicekey.replace(/(\r\n|\n|\r)/gm,"");

var url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + String(servicekey); /* Service Key*/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* 한 페이지 결과 수 */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 페이지 번호 */
queryParams += '&' + encodeURIComponent('sidoName') + '=' + encodeURIComponent('서울'); /* sidoName */
queryParams += '&' + encodeURIComponent('_returnType') + '=' + encodeURIComponent('json'); //return type
var data = "";
request({url: url + queryParams, method: 'GET'}, function (error, response, body){
                    data = body;
});

app.get('/', function(req, res){
    console.log ("runing")
  /*  request({
        url: url + queryParams,
        method: 'GET'
    }, function (error, response, body) {
        res.send(body)
    });
    */
   res.send(data);
});

app.listen(http_port);
console.log("Express Listening on port 3000...")
