var request = require('request');
var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/atmos')

var app = express()




var url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=My4MBr5BwgTqOpiGFM1X0GQNMYc%2BCB2ZXHUIKsnCmrPstaY%2BIR5e4fsBZIrrJ8WZvS9GSXmnxMa%2BO7mefmEEEg%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* 한 페이지 결과 수 */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 페이지 번호 */
queryParams += '&' + encodeURIComponent('sidoName') + '=' + encodeURIComponent('서울'); /* sidoName */
queryParams += '&' + encodeURIComponent('_returnType') + '=' + encodeURIComponent('json'); //return type

app.get('/', function(req, res){
    console.log ("runing")
    request({
        url: url + queryParams,
        method: 'GET'
    }, function (error, response, body) {
        res.send(body)
    });
});

app.listen(3000);
console.log("Express Listening on port 3000...")
