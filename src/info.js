var request = require('request');
var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/atmos')

var Schema = mongoose.Schema
var station = new Schema({
    name : String,
    data : { CAIValue : Number, CAIGrade : Number},
    date : Date
})
var servicekey = fs.readFileSync("./servicekey.txt", "utf8")
servicekey = servicekey.replace(/(\r\n|\n|\r)/gm,"");


var atmosModel = mongoose.model('stations', station);

var url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + String(servicekey); /* Service Key*/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* 한 페이지 결과 수 */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 페이지 번호 */
queryParams += '&' + encodeURIComponent('sidoName') + '=' + encodeURIComponent('서울'); /* sidoName */
queryParams += '&' + encodeURIComponent('_returnType') + '=' + encodeURIComponent('json'); //return type

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body){
     var data = JSON.parse(body)
     for (a in data.list) {
         info = data.list[a];
         var instance = new atmosModel();
         instance.name = info.stationName;
         instance.data.CAIValue = info.khaiValue;
         instance.data.CAIGrade = info.khaiGrade;
         instance.save(function(err){});
         console.log("save the data")
         console.log(info)
     }
});



